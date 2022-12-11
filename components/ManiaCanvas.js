import React, { useRef, useEffect, useState } from "react";
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
  scrollSpeed: 20,
  song: song3,
  volume: 0.2,
};

const skinOptions = {
  judgePos: 50,
  noteWidth: 40,
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

const laneColorMap = {
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
  const playfieldBgRef = useRef(null);
  const playfieldRef = useRef(null);
  const playfieldOverlayRef = useRef(null);
  let controller;
  let audio;

  useEffect(() => {
    controller = new GameController({
      overlay: playfieldOverlayRef.current,
    });

    // audio = new AudioController({})
  }, []);

  useEffect(() => playfieldBg(playfieldBgRef), [controller]);
  useEffect(() => playfield(playfieldRef), [controller]);
  useEffect(
    () => playfieldOverlay(playfieldOverlayRef, controller),
    [controller]
  );

  return (
    <>
      <div id="stage">
        {" "}
        <canvas
          id="playfieldBg"
          width={skinOptions.noteWidth * 7}
          height={640}
          ref={playfieldBgRef}
          {...props}
        />
        <canvas
          id="playfieldOverlay"
          width={skinOptions.noteWidth * 7}
          height={640}
          ref={playfieldOverlayRef}
          {...props}
        />
        <canvas
          id="playfield"
          width={skinOptions.noteWidth * 7}
          height={640 - skinOptions.judgePos}
          ref={playfieldRef}
          {...props}
        />
        <button disabled id="playBtn">
          loading
        </button>
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
        #playfieldBg {
          z-index: 1;
        }
        #playfield {
          z-index: 2;
        }
        #playfieldOverlay {
          z-index: 3;
          border-right: 1px solid black;
        }

        #playBtn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
      `}</style>
    </>
  );
};

export default ManiaCanvas;

const playfield = (ref) => {
  const canvas = ref.current;
  // ref.current.toPlay = false;

  let ptrStart = 0;
  let ptrEnd = 0;
  // let canPlay = false;
  let frameCount = 0;
  let context = canvas.getContext("2d");
  let notes = gameOptions.song.notes;
  let audio = new Audio(gameOptions.song.audioUrl);
  let { scrollSpeed, volume } = gameOptions;
  let { noteWidth } = skinOptions;
  audio.volume = volume;

  let songNotes = Object.values(notes);

  let animationFrame;

  // start audio when ready to play
  const onCanPlay = () => {
    // canPlay = true;
    document.getElementById("playBtn").innerHTML = "play";
    document.getElementById("playBtn").removeAttribute("disabled");
    document.getElementById("playBtn").addEventListener("click", () => {
      audio.play();
      document.getElementById("playBtn").remove();
    });
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
        context.fillStyle = laneColorMap[7][note.col];
        context.fillRect((note.col - 1) * noteWidth, dy, noteWidth, 10);
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
  const { judgePos, noteWidth } = skinOptions;
  let ctx = canvas.getContext("2d");

  let animationFrame;

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1px border below judge
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, canvas.height - judgePos, canvas.width, 1);

    // judge line
    ctx.fillStyle = "rgba(250, 100, 100, 0.4)";
    ctx.fillRect(0, canvas.height - judgePos - 10, canvas.width, 10);

    // interactive piano keys
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    Object.values(controller.activeCols).forEach((col, i) => {
      if (col) {
        ctx.fillRect(noteWidth * i, canvas.height - judgePos, noteWidth, 50);
      }
    });
    animationFrame = window.requestAnimationFrame(render);
  };
  render();

  return () => {
    window.cancelAnimationFrame(animationFrame);
  };
};

const playfieldBg = (ref) => {
  const canvas = ref.current;
  const { judgePos } = skinOptions;
  let ctx = canvas.getContext("2d");
  let animationFrame;

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(20, 20, 20, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height - judgePos);

    animationFrame = window.requestAnimationFrame(render);
  };
  render();

  return () => {
    window.cancelAnimationFrame(animationFrame);
  };
};
