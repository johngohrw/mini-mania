import { NoteFactory } from "./NoteFactory";
import { OptionsProvider } from "./OptionsProvider";
import { AudioProvider } from "./AudioProvider";
import { SkinProvider } from "../game/SkinProvider";
import { getInverseMap } from "./notes";
import { FeedbackRenderer } from "./FeedbackRenderer";

export class GameController {
  constructor({
    bgCanvas,
    fgCanvas,
    gameCanvas,
    songInfo,
    skin,
    initialOptions,
    gameScale = 1,
  }) {
    console.log("[GameController] initialising game...", songInfo);
    this.ready = false;
    this.frameCount = 0;
    this.gameTime = 0;
    this.animationFrame;
    this.skin = skin;
    this.debug = false;
    this.songInfo = songInfo;
    this.gameScale = gameScale;

    // init game options
    this.options = new OptionsProvider(initialOptions); // init misc
    this.score = 0;
    this.keymap = getInverseMap(this.options.keyMaps[songInfo["keys"]], (val) =>
      parseInt(val)
    );

    // init audio
    const audioClass = new AudioProvider({
      url: songInfo.url,
      onCanPlayFunction: () =>
        console.log("onCanPlayFunction. do something with this."), // TODO
    });

    this.audioClass = audioClass;
    this.audio = audioClass.instance;
    this.audio.volume = this.options.gameVolume;
    this.isPlaying = !this.audio.paused;

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
    this.feedback = new FeedbackRenderer({
      canvas: this.fg,
      skin: this.skin,
      keyCount: songInfo.keys,
      options: this.options,
    });

    // bind keypress events
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));

    // prerender setup code
    this.prerender();

    // start render loop
    this.render();
  }

  gameSetPaused(paused) {
    if (paused) {
      this.audio?.pause();
    } else {
      this.audio?.play();
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

  adjustOption(key, value) {
    this.options[key] = value;
  }

  set(key, value) {
    this[key] = value;
  }

  prerender() {
    this.fgCtx.font = "normal 12pt Arial";
    this.gameCtx.font = "normal 8pt Arial";
  }

  render() {
    this.frameCount++;
    this.gameTime = Math.floor(this.audio.currentTime * 1000);
    this.gameCtx.clearRect(
      0,
      0,
      this.game.width * this.gameScale,
      this.game.height * this.gameScale
    );
    this.fgCtx.clearRect(0, 0, this.fg.width, this.fg.height);
    // this.bgCtx.clearRect(0, 0, this.bg.width, this.bg.height);

    this.NoteFactory.draw(this.gameTime, this.debug);
    this.feedback.draw();
    this.skin.drawJudge({ canvas: this.bg, keyCount: this.songInfo.keys });

    this.animationFrame = window.requestAnimationFrame(this.render.bind(this));
  }
}
