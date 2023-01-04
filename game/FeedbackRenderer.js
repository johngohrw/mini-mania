export class FeedbackRenderer {
  constructor({ canvas, skin, keyCount }) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.skin = skin;

    // init activeCols to {0: false, 0: false, ...}
    this.activeCols = new Array(keyCount).reduce((acc, curr) => {
      acc[curr] = false;
      return acc;
    }, {});
  }

  // render feedback effects on canvas
  draw() {
    // interactive piano keys
    this.context.fillStyle = "rgba(0, 0, 200, 0.5)";
    Object.values(this.activeCols).forEach((col, i) => {
      if (col) {
        this.context.fillRect(
          this.skin.noteWidth * i,
          this.canvas.height - this.skin.judgePos,
          this.skin.noteWidth,
          50 // note keys height. refactor this later.
        );
      }
    });
  }
}
