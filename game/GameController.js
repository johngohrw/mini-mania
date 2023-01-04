import { NoteFactory } from "./NoteFactory";
import { OptionsProvider } from "./OptionsProvider";
import { AudioProvider } from "./audioProvider";
import { SkinProvider } from "../game/SkinProvider";
import { getInverseMap } from "./notes";
import { FeedbackRenderer } from "./FeedbackRenderer";

export class GameController {
  constructor({ bgCanvas, fgCanvas, gameCanvas, songInfo, initialOptions }) {
    console.log("[GameController] initialising game...", songInfo);
    this.ready = false;
    this.frameCount = 0;
    this.gameTime = 0;
    this.animationFrame;

    // init skin
    this.skin = new SkinProvider({});

    // init game options
    this.options = new OptionsProvider(initialOptions); // init misc
    this.score = 0;
    this.keymap = getInverseMap(this.options.keyMaps[songInfo["keys"]], (val) =>
      parseInt(val)
    );
    console.log(">", this.keymap);

    // init audio
    const { instance: audio } = new AudioProvider({
      url: songInfo.url,
      onCanPlayFunction: () => console.log("canplaydy"),
    });
    this.audio = audio;
    this.audio.volume = this.options.gameVolume;

    // init canvas contexts
    this.fg = fgCanvas;
    this.fgCtx = this.fg.getContext("2d");
    this.game = gameCanvas;
    this.gameCtx = this.game.getContext("2d");
    this.bg = bgCanvas;
    this.bgCtx = this.bg.getContext("2d");

    // init notes
    this.NoteFactory = new NoteFactory({
      songInfo: songInfo,
      canvas: gameCanvas,
      options: this.options,
      audio: this.audio,
      skin: this.skin,
    });

    // init feedback
    this.feedback = new FeedbackRenderer({ canvas: this.fg, skin: this.skin });

    // bind keypress events
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));

    // start render loop
    this.render();
  }

  gameStart() {
    console.log("[GameController] game start");
    this.audio?.play();
  }

  gamePause() {
    this.audio?.pause();
  }

  gameTogglePausePlay() {
    if (this.audio?.paused) {
      this.audio?.play();
    } else {
      this.audio?.pause();
    }
  }

  unmountGame() {
    console.log("[GameController] unmounting game");
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keyup", this.onKeyUp);
    this?.audio?.pause();
  }

  onKeyDown(e) {
    if (this.keymap[e.key]) {
      this.feedback.activeCols[this.keymap[e.key]] = true;
    }
  }

  onKeyUp(e) {
    if (this.keymap[e.key]) {
      this.feedback.activeCols[this.keymap[e.key]] = false;
    }
  }

  render() {
    this.frameCount++;

    this.gameTime = this.audio.currentTime * 1000;
    this.gameCtx.clearRect(0, 0, this.game.width, this.game.height);
    this.fgCtx.clearRect(0, 0, this.fg.width, this.fg.height);
    this.bgCtx.clearRect(0, 0, this.bg.width, this.bg.height);

    this.NoteFactory.draw(this.gameTime);
    this.feedback.draw();

    this.animationFrame = window.requestAnimationFrame(this.render.bind(this));
  }
}
