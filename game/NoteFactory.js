// number of seconds to lookahead
// for a note to be considered in render range.
const LOOKAHEAD_TIME = 5000;

export class NoteFactory {
  constructor({ songInfo, canvas, options, audio, skin }) {
    console.log("[NoteFactory] initializing notes...", songInfo, canvas);
    this.options = options;
    this.audio = audio;
    this.skin = skin;
    this.songInfo = songInfo;
    this.notes = songInfo.notes;
    this.songNotesArray = Object.values(songInfo.notes);
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.animationFrame;

    // notes to render. periodically updated (not every frame).
    this.renderQueue = {};

    // initial lookahead, adds first notes to render queue.
    this.updateRenderQueue(0, LOOKAHEAD_TIME);
  }

  // draw notes on canvas
  draw(gameTime) {
    this.songNotesArray.forEach((timeStep) => {
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
    });

    // update render queue if needed.
    // checks next note with lookahead time.
    this.updateRenderQueue(gameTime, gameTime + LOOKAHEAD_TIME);
  }

  // based on the current time and the lookahead, add in more notes to the render queue
  updateRenderQueue(time, lookahead) {
    console.log();
  }

  // remove a particular note (after hitting it or when it's past the render distance(?))
  removeNote() {}
}
