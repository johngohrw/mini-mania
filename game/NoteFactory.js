// number of seconds to lookahead
// for a note to be considered in render range.
const LOOKAHEAD_TIME = 5000;

export class NoteFactory {
  constructor({
    songInfo,
    canvas,
    options,
    audio,
    skin,
    lookaheadDuration = LOOKAHEAD_TIME,
  }) {
    console.log("[NoteFactory] initializing notes...", songInfo, canvas);
    this.options = options;
    this.audio = audio;
    this.skin = skin;
    this.songInfo = songInfo;
    this.notes = songInfo.notes;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.animationFrame;
    this.lookaheadDuration = lookaheadDuration;

    // renderQueue array
    this.renderQueue = Object.values(songInfo.notes);

    // start/end pointers for renderable notes
    this.renderStartPtr = 0;
    this.renderEndPtr = 0;
    this.renderableNoteCount = 0;

    // initial lookahead, updates start/end pointers.
    this.updateRenderableNotes(0, this.lookaheadDuration);
  }

  // draw notes on canvas in-between start-end pointers.
  draw(gameTime, frameCount) {
    for (let i = this.renderStartPtr; i < this.renderEndPtr; i++) {
      const timeStep = this.renderQueue[i];
      // each timeStep might consist of multiple notes (chords)
      timeStep.forEach((note) => {
        let dt = gameTime - note.t_hit;
        let dy = dt * 0.05 * this.options.scrollSpeed + this.canvas.height;
        if (dy > -100) {
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
    }

    // update renderable notes if needed.
    if (frameCount % 60 === 0) {
      this.updateRenderableNotes(gameTime, this.lookaheadDuration);
    }
  }

  // Based on the current time and the lookahead, add in more notes to the render queue.
  // Also updates the startPointer based on gameTime.
  // Can be called infrequently to boost performance (instead of every frame).
  updateRenderableNotes(currTime, lookaheadDuration) {
    console.log("updateRenderableNotes", currTime);
    const lookaheadTime = currTime + lookaheadDuration;

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
      this.renderQueue[this.renderStartPtr][0].t_hit < currTime
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
