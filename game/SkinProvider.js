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

export class SkinProvider {
  constructor({
    laneColorMap = defaultLaneColorMap,
    bgColor = defaultBgColor,
  }) {
    console.log("[SkinProvider] initialising skin...");
    this.noteWidth = 40;
    this.judgePos = 50;
    this.laneColors = objectSpreader(defaultLaneColorMap, laneColorMap);
    this.playfieldBgColor = bgColor || defaultBgColor;
  }
}

const objectSpreader = (defaultObj, incomingProp) => {
  return defaultObj ? { ...defaultObj, ...incomingProp } : defaultObj;
};
