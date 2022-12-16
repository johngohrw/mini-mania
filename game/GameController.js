import { NoteRenderer } from "./NoteRenderer";
import { OptionsProvider } from "./OptionsProvider";

export class GameController {
  constructor({ overlay, songInfo }) {
    const { gameVolume, scrollSpeed, offset, keyMaps } = OptionsProvider({});
    const { renderQueue } = NoteRenderer({ note: null, canvas: null });

    this.overlay = overlay;
    this.overlayContext = this.overlay.getContext("2d");
    this.keymap = getInverseMap(keymap[7], (val) => parseInt(val));
    this.score = 0;
    this.paused = true;

    document.addEventListener("keydown", (e) => {
      if (this.keymap[e.key]) {
        this.activeCols[this.keymap[e.key]] = true;
      }
    });
    document.addEventListener("keyup", (e) => {
      if (this.keymap[e.key]) {
        this.activeCols[this.keymap[e.key]] = false;
      }
    });
  }

  gameStart() {
    this.paused = false;
  }

  gamePause() {
    this.paused = true;
  }
}
