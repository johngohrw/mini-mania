export class FeedbackRenderer {
  constructor({ canvas, skin, keyCount }) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.skin = skin;
    this.keyCount = keyCount;

    console.log("this.skin.laneColors");

    // init activeCols to {0: false, 1: false, ...}
    this.activeCols = Array(keyCount)
      .fill(null)
      .map((_, i) => i + 1)
      .reduce((acc, curr) => {
        acc[curr] = false;
        return acc;
      }, {});
  }

  // render feedback effects on canvas
  draw() {
    // interactive piano keys
    Object.values(this.activeCols).forEach((col, i) => {
      if (col) {
        this.context.fillStyle = this.skin.laneColors[this.keyCount][i + 1];
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
