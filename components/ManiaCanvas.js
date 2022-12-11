import React, { useRef, useEffect } from "react";
import testSong from "../public/songs/Dormir - Sayonara Trip/Dormir - Sayonara Trip (Simple_Star) [4K LV.5].json";
import loosSong from "../public/songs/128855 Loos - Koi Yomi Zakura/Loos - Koi Yomi Zakura (_S u w a k o_) [7K Lv.36].json";
import yoasobiYoruNiKakeruSong from "../public/songs/1299810 YOASOBI - Yoru ni Kakeru/YOASOBI - Yoru ni Kakeru (arcwinolivirus) [7K Blind My Sight].json";
import { convertNotes } from "../utils/notes";

const song = {
  notes: convertNotes(testSong.notes),
  audioUrl: "./songs/Dormir - Sayonara Trip/Sayonara Trip.mp3",
};

const song2 = {
  notes: convertNotes(loosSong.notes, 70),
  audioUrl: "./songs/128855 Loos - Koi Yomi Zakura/loos - Omoi Yoshino.mp3",
};

const song3 = {
  notes: convertNotes(yoasobiYoruNiKakeruSong.notes, 70),
  audioUrl: "./songs/1299810 YOASOBI - Yoru ni Kakeru/audio.mp3",
};

const gameOptions = {
  judgePosition: 100,
  scrollSpeed: 25,
  song: song3,
  volume: 0.02,
};

const keymap = {
  7: {
    1: "s",
    2: "d",
    3: "f",
    4: " ",
    5: "j",
    6: "k",
    7: "l",
  },
};

const getInverseMap = (obj, transform = (val) => val) => {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    acc[v] = transform(k);
    return acc;
  }, {});
};

class GameController {
  constructor({ overlay }) {
    this.overlay = overlay;
    this.overlayContext = this.overlay.getContext("2d");
    this.keymap = getInverseMap(keymap[7], (val) => parseInt(val));
    this.activeCols = {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
    };

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
}

const ManiaCanvas = (props) => {
  const playfieldRef = useRef(null);
  const playfieldOverlayRef = useRef(null);
  let controller;

  const drawNotes = (ctx, time, notes, speed, yOffset) => {
    const note = Object.values(notes)[0];
    const dt = time - note.t_hit;
    const x = Math.floor(note.x / 2);
    const dy = Math.floor(dt * speed * 0.05);
    ctx.fillRect(x, dy + yOffset, 48, 10);
  };

  useEffect(() => {
    controller = new GameController({
      overlay: playfieldOverlayRef.current,
    });
  }, []);

  useEffect(() => playfield(playfieldRef), [controller]);
  useEffect(
    () => playfieldOverlay(playfieldOverlayRef, controller),
    [controller]
  );

  return (
    <>
      <div id="stage">
        <canvas
          id="playfieldOverlay"
          width={294}
          height={640}
          ref={playfieldOverlayRef}
          {...props}
        />
        <canvas
          id="playfield"
          width={294}
          height={640}
          ref={playfieldRef}
          {...props}
        />
      </div>

      <style jsx>{`
        #stage {
          width: 800px;
          height: 640px;
          position: relative;
          border: 1px solid black;
        }
        canvas {
          position: absolute;
        }
        #playfield {
          z-index: 1;
          border: 1px solid red;
        }
        #playfieldOverlay {
          z-index: 2;
          border: 1px solid red;
        }
      `}</style>
    </>
  );
};

export default ManiaCanvas;

const playfield = (ref) => {
  const canvas = ref.current;

  let ptrStart = 0;
  let ptrEnd = 0;
  let frameCount = 0;
  let context = canvas.getContext("2d");
  let notes = gameOptions.song.notes;
  let audio = new Audio(gameOptions.song.audioUrl);
  let { scrollSpeed, volume } = gameOptions;
  audio.volume = volume;

  let songNotes = Object.values(notes);

  let animationFrame;

  // start audio when ready to play
  const onCanPlay = () => {
    audio.play();
  };
  audio.addEventListener("canplay", onCanPlay);

  const onFieldClick = () => {
    console.log("click");
  };
  document.getElementById("playfield").addEventListener("click", onFieldClick);

  const render = () => {
    frameCount++;
    let { currentTime } = audio;
    let time = currentTime * 1000;
    context.clearRect(0, 0, canvas.width, canvas.height);

    songNotes.forEach((timeStep) => {
      timeStep.forEach((note) => {
        let dt = time - note.t_hit;
        let dy = dt * 0.05 * scrollSpeed + canvas.height;
        context.fillRect((note.col - 1) * 42, dy, 42, 10);
      });
    });

    animationFrame = window.requestAnimationFrame(render);
  };
  render();

  return () => {
    window.cancelAnimationFrame(animationFrame);
    audio.removeEventListener("canplay", onCanPlay);
    audio.pause();
    document
      .getElementById("playfield")
      .removeEventListener("click", onFieldClick);
  };
};

const playfieldOverlay = (ref, controller) => {
  const canvas = ref.current;
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(200, 0, 0, 0.5)";

  let animationFrame;

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Object.values(controller.activeCols).forEach((col, i) => {
      if (col) {
        ctx.fillRect(42 * i, canvas.height - 10, 42, 10);
      }
    });
    animationFrame = window.requestAnimationFrame(render);
  };
  render();

  return () => {
    window.cancelAnimationFrame(animationFrame);
  };
};
