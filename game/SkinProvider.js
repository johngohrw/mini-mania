const defaultLaneColorMap = {
  7: {
    1: "rgb(200, 200, 200)",
    2: "rgb(100, 100, 255)",
    3: "rgb(200, 200, 200)",
    4: "rgb(255, 100, 100)",
    5: "rgb(200, 200, 200)",
    6: "rgb(100, 100, 255)",
    7: "rgb(200, 200, 200)",
  },
};

const defaultBgColor = "rgb(0, 0, 0)";
const defaultJudgePos = 250;
const defaultNoteWidth = 40;
const defaultNoteHeight = 10;

export class SkinProvider {
  constructor({
    laneColorMap = defaultLaneColorMap,
    bgColor = defaultBgColor,
  }) {
    console.log("[SkinProvider] initialising skin...");
    this.noteWidth = defaultNoteWidth;
    this.noteHeight = defaultNoteHeight;
    this.judgePos = defaultJudgePos;
    this.laneColors = objectSpreader(defaultLaneColorMap, laneColorMap);
    this.playfieldBgColor = bgColor || defaultBgColor;
  }

  drawJudge({ canvas, keyCount = 7 }) {
    const context = canvas.getContext("2d");
    context.fillStyle = "rgb(255, 0, 0)";
    context.fillRect(
      0,
      canvas.height - this.judgePos,
      keyCount * this.noteWidth,
      10
    );
  }
}

const objectSpreader = (defaultObj, incomingProp) => {
  return defaultObj ? { ...defaultObj, ...incomingProp } : defaultObj;
};
