export class NoteRenderer {
  constructor({ notes, canvas }) {
    this.notes = notes;
    this.canvas = canvas;

    // notes to render. periodically updated (not every frame).
    this.renderQueue = {};
  }

  // draw notes on canvas
  drawNotes() {}

  // based on the current time and the lookahead, add in more notes to the render queue
  updateRenderQueue(time, lookahead) {}

  // remove a particular note (after hitting it or when it's past the render distance(?))
  removeNote() {}
}
