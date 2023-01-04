// number of seconds to lookahead
// for a note to be considered in render range.
const LOOKAHEAD_TIME = 5000;
const SCROLL_CONSTANT = 20;

export class NoteFactory {
  constructor({ songInfo, canvas, options, audio, skin, naive = true }) {
    console.log("[NoteFactory] initializing notes...", songInfo, canvas);
    this.options = options;
    this.audio = audio;
    this.skin = skin;
    this.naive = naive;
    this.songInfo = songInfo;
    this.notes = songInfo.notes;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.animationFrame;
    this.lookaheadDuration =
      ((100 * this.options.scrollSpeed) / SCROLL_CONSTANT) *
      (this.canvas.height - this.skin.judgePos);
    this.lookaheadLastUpdate = performance.now();
    this.updateInterval = 500; // interval between every renderable note update call

    // renderQueue array
    this.renderQueue = Object.values(songInfo.notes);

    if (!this.naive) {
      // start/end pointers for renderable notes
      this.renderStartPtr = 0;
      this.renderEndPtr = 0;
      this.renderableNoteCount = 0;

      // initial lookahead, updates start/end pointers.
      this.updateRenderableNotes(0, this.lookaheadDuration);
    }
  }

  // draw notes on canvas in-between start-end pointers.
  draw(gameTime, frameCount) {
    for (let i = this.renderStartPtr; i < this.renderEndPtr; i++) {
      const timeStep = this.renderQueue[i];
      // each timeStep might consist of multiple notes (chords)
      timeStep.forEach((note) => {
        let dt = gameTime - note.t_hit; // time difference
        let dy = (dt * this.options.scrollSpeed) / SCROLL_CONSTANT;
        // avoid sub-pixel rendering by eliminating float-point coords.
        dy = Math.floor(dy);
        // only render when note comes into screen
        if (-600 < dy && dy < 100) {
          const notePos = dy + this.canvas.height - this.skin.judgePos;
          this.context.fillStyle =
            this.skin.laneColors[this.songInfo.keys][note.col];
          this.context.fillRect(
            (note.col - 1) * this.skin.noteWidth,
            notePos,
            this.skin.noteWidth,
            this.skin.noteHeight
          );

          // dy debug
          this.context.fillText(
            dy,
            (note.col - 1) * this.skin.noteWidth,
            notePos
          );
        }
      });
    }

    const now = performance.now();
    // update renderable notes every interval.
    if (now - this.lookaheadLastUpdate > this.updateInterval) {
      this.lookaheadLastUpdate = now;
      this.updateRenderableNotes(gameTime, this.lookaheadDuration);
    }
  }

  // naive drawNote implementation without using pointers
  drawNaive(gameTime) {
    this.renderQueue.forEach((timeStep) => {
      // each timeStep might consist of multiple notes (chords)
      timeStep.forEach((note) => {
        let dt = gameTime - note.t_hit;
        let dy = dt * 0.05 * this.options.scrollSpeed + this.canvas.height;
        if (dy > -100) {
          // avoid sub-pixel rendering by eliminating float-point coords.
          dy = Math.floor(dy);
          this.context.fillStyle =
            this.skin.laneColors[this.songInfo.keys][note.col];
          this.context.fillRect(
            (note.col - 1) * this.skin.noteWidth,
            dy,
            this.skin.noteWidth,
            10
          );
        }
      });
    });
  }

  // Based on the current time and the lookahead, add in more notes to the render queue.
  // Also updates the startPointer based on gameTime.
  // Can be called infrequently to boost performance (instead of every frame).
  updateRenderableNotes(currTime, lookaheadDuration) {
    const lookaheadTime = currTime + lookaheadDuration;
    const gracePeriod = 200; // let stale notes linger

    // add in more notes, incrementing renderEndPtr
    while (
      this.renderEndPtr < this.renderQueue.length &&
      this.renderQueue[this.renderEndPtr][0].t_hit < lookaheadTime
    ) {
      this.renderEndPtr++;
    }

    // check for stale notes, incrementing renderStartPtr
    while (
      this.renderStartPtr < this.renderQueue.length &&
      this.renderQueue[this.renderStartPtr][0].t_hit < currTime - gracePeriod
    ) {
      this.renderStartPtr++;
    }

    this.renderableNoteCount = this.renderEndPtr - this.renderStartPtr;
  }

  // manual note state reset
  resetNotes() {
    this.renderQueuePointer = 0;
    this.notesToRender = [];
    this.notesToRenderPointer = 0;
  }
}
