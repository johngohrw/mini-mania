export class FeedbackRenderer {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.activeCols = {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
    };
  }
  
  // render notehit effects on canvas
  noteHit() {}
}
