export class OptionsProvider {
  constructor(options) {
    this.options = {...defaultOptions, ...options}
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
      0: "d",
      1: "f",
      2: "j",
      3: "k",
    },
    5: {
      0: "d",
      1: "f",
      2: " ",
      3: "j",
      4: "k",
    },
    6: {
      0: "s",
      1: "d",
      2: "f",
      3: "j",
      4: "k",
      5: "l",
    },
    7: {
      0: "s",
      1: "d",
      2: "f",
      3: " ",
      4: "j",
      5: "k",
      6: "l",
    },
  },
  gameVolume: 0.5,
  scrollSpeed: 10,
  offset: 0,
};
