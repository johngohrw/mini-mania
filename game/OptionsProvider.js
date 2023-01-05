export class OptionsProvider {
  constructor(options) {
    this.options = { ...defaultOptions, ...options };
    this.defaults = defaultOptions;
    // game volume, both song and ingame.
    this.gameVolume = options?.gameVolume || this.defaults.gameVolume;

    // note scroll speed. not BPM-based.
    this.scrollSpeed = options?.scrollSpeed || this.defaults.scrollSpeed;

    // delay offset (ms) that is applied to note-rendering
    this.offset = options?.offset || this.defaults.offset;

    // key configuration
    this.keyMaps = options?.keyMaps || this.defaults.keyMaps;
  }

  setVolume({ value }) {
    this.gameVolume = value;
  }

  incrementVolume({ incrementValue }) {
    this.gameVolume += incrementValue;
  }

  incrementOffset({ incrementValue }) {
    this.offset += incrementValue;
  }
}

const defaultOptions = {
  keyMaps: {
    4: {
      1: "d",
      2: "f",
      3: "j",
      4: "k",
    },
    5: {
      1: "d",
      2: "f",
      3: " ",
      4: "j",
      5: "k",
    },
    6: {
      1: "s",
      2: "d",
      3: "f",
      4: "j",
      5: "k",
      6: "l",
    },
    7: {
      1: "s",
      2: "d",
      3: "f",
      4: " ",
      5: "j",
      6: "k",
      7: "l",
    },
    8: {
      1: "a",
      2: "s",
      3: "d",
      4: "f",
      5: " ",
      6: "j",
      7: "k",
      8: "l",
    },
  },
  gameVolume: 0.5,
  scrollSpeed: 10,
  offset: 0,
};
