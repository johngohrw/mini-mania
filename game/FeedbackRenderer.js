export class FeedbackRenderer {
  constructor({ canvas, skin, options, keyCount }) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.skin = skin;
    this.options = options;
    this.keyCount = keyCount;

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
    // key bg
    this.context.fillStyle = "rgb(150, 150, 150)";

    this.context.fillRect(
      0, // refactor this to skin.playfieldLeftPos
      this.canvas.height - this.skin.judgePos + this.skin.noteHeight,
      this.skin.noteWidth * this.keyCount,
      this.skin.judgePos + this.skin.noteHeight
    );

    // interactive piano keys
    Object.values(this.activeCols).forEach((col, i) => {
      if (col) {
        this.context.fillStyle = this.skin.laneColors[this.keyCount][i + 1];
        this.context.fillRect(
          this.skin.noteWidth * i,
          this.canvas.height - this.skin.judgePos + this.skin.noteHeight,
          this.skin.noteWidth,
          this.skin.judgePos + this.skin.noteHeight // note keys height. refactor this later.
        );
      }
    });

    // key bindings
    const keymap = this.options.keyMaps[this.keyCount];
    this.context.fillStyle = "rgb(0, 0, 0)";
    for (let i = 0; i < this.keyCount; i++) {
      this.context.fillText(
        keymap[i + 1],
        this.skin.noteWidth * i + this.skin.noteWidth / 2 - 5,
        this.canvas.height - this.skin.judgePos / 2 + this.skin.noteHeight
      );
    }
  }
}
