// number of seconds to lookahead
// for a note to be considered in render range.

const SCROLL_CONSTANT = 20;

export class NoteFactory {
  constructor({ songInfo, canvas, options, audio, skin }) {
    console.log("[NoteFactory] initializing notes...", songInfo, canvas);
    this.options = options;
    this.audio = audio;
    this.skin = skin;
    this.songInfo = songInfo;
    this.notes = songInfo.notes;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.animationFrame;

    // renderQueue array
    this.renderQueue = Object.values(songInfo.notes);

    // start/end pointers for renderable notes
    this.renderStartPtr = 0;
    this.ptrLastUpdate = performance.now();
    this.updateInterval = 500; // interval between every renderable note update call

    // initial lookahead, updates start/end pointers.
    this.updateStartPtr(0);
  }

  // draw notes on canvas in-between start-end pointers.
  draw(gameTime) {
    for (let i = this.renderStartPtr; i < this.renderQueue.length; i++) {
      const timeStep = this.renderQueue[i];
      const arbitraryNote = timeStep[0];

      // time difference
      let dt = gameTime - arbitraryNote.t_hit;

      // pixel offset (from judgePos) based on scrollSpeed and Scroll Constant
      let dy = (dt * this.options.scrollSpeed) / SCROLL_CONSTANT;

      // stop rendering notes when notes are already out of canvas frame
      if (dy < -(this.canvas.height + this.skin.judgePos)) {
        break;
      }

      // avoid sub-pixel rendering by eliminating float-point coords.
      dy = Math.floor(dy);
      // only render when note comes into screen
      if (-600 < dy && dy < 100) {
        const notePos = dy + this.canvas.height - this.skin.judgePos;

        // each timeStep might consist of multiple notes (chords)
        timeStep.forEach((note) => {
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
        });
      }
    }

    const now = performance.now();
    // update renderable notes every interval.
    if (now - this.ptrLastUpdate > this.updateInterval) {
      this.ptrLastUpdate = now;
      this.updateStartPtr(gameTime);
    }
  }

  // Updates the startPointer based on gameTime.
  // Can be called infrequently to boost performance (instead of every frame).
  updateStartPtr(currTime) {
    const gracePeriod = 200; // let stale notes linger

    // check for stale notes, incrementing renderStartPtr
    while (
      this.renderStartPtr < this.renderQueue.length &&
      this.renderQueue[this.renderStartPtr][0].t_hit < currTime - gracePeriod
    ) {
      this.renderStartPtr++;
    }
  }

  // manual note state reset
  resetNotes() {
    this.renderQueuePointer = 0;
    this.notesToRender = [];
    this.notesToRenderPointer = 0;
  }
}
