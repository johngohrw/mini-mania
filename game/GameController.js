import { NoteFactory } from "./NoteFactory";
import { OptionsProvider } from "./OptionsProvider";
import { AudioProvider } from "./AudioProvider";
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

    // fps calculation vars
    this.fps;
    this.lastRender;
    this.delta;

    // init skin
    this.skin = new SkinProvider({});

    // init game options
    this.options = new OptionsProvider(initialOptions); // init misc
    this.score = 0;
    this.keymap = getInverseMap(this.options.keyMaps[songInfo["keys"]], (val) =>
      parseInt(val)
    );

    // init audio
    const { instance: audio } = new AudioProvider({
      url: songInfo.url,
      onCanPlayFunction: () => console.log("canplaydy"),
    });
    this.audio = audio;
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
      naive: false,
    });

    // init feedback
    this.feedback = new FeedbackRenderer({
      canvas: this.fg,
      skin: this.skin,
      keyCount: songInfo.keys,
    });

    // bind keypress events
    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));

    // prerender setup code
    this.prerender();

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

  adjustOption(key, value) {
    this.options[key] = value;
  }

  prerender() {
    this.fgCtx.fillStyle = "Black";
    this.fgCtx.font = "normal 16pt Arial";
  }

  render() {
    this.frameCount++;

    // fps calculation
    const now = performance.now();
    this.delta = now - this.lastRender;
    this.fps = 1000 / this.delta;
    this.lastRender = now;
    this.fgCtx.fillText("test" + this.fps, 10, 26);

    this.gameTime = this.audio.currentTime * 1000;
    this.gameCtx.clearRect(0, 0, this.game.width, this.game.height);
    this.fgCtx.clearRect(0, 0, this.fg.width, this.fg.height);
    this.bgCtx.clearRect(0, 0, this.bg.width, this.bg.height);

    this.NoteFactory.draw(this.gameTime, this.frameCount);
    this.feedback.draw();
    this.skin.drawJudge({ canvas: this.bg });

    this.animationFrame = window.requestAnimationFrame(this.render.bind(this));
  }
}
