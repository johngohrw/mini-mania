import React, { useRef, useEffect, useState } from "react";
import { GameController } from "../game/GameController";

import { SkinProvider } from "../game/SkinProvider";

const gameScale = 2;
const skin = new SkinProvider({ gameScale: 1 });

const ManiaCanvas = ({
  songInfo,
  debugMode,
  scrollSpeed = 10,
  slanted,
  volume = 0.2,
  paused,
  ...rest
}) => {
  const gameBgRef = useRef(null);
  const gameRef = useRef(null);
  const gameFgRef = useRef(null);
  const [game, setGame] = useState(null);

  const gameWidth = skin?.noteWidth * songInfo?.keys;
  const gameHeight = 640;

  useEffect(() => {
    game?.adjustOption("scrollSpeed", scrollSpeed);
  }, [scrollSpeed]);

  useEffect(() => {
    game?.set("debug", debugMode);
  }, [debugMode]);

  useEffect(() => {
    game?.gameSetPaused(paused);
  }, [paused]);

  useEffect(() => {
    game?.audioClass?.setAudioAttribute("volume", volume);
  }, [volume]);

  // initialise game controller
  useEffect(() => {
    let g;
    if (gameFgRef.current && gameRef.current) {
      g = new GameController({
        fgCanvas: gameFgRef.current,
        bgCanvas: gameBgRef.current,
        gameCanvas: gameRef.current,
        songInfo: songInfo,
        skin: skin,
        initialOptions: { gameVolume: volume, scrollSpeed },
        gameScale: gameScale,
      });
      setGame(g);
    }

    // call unmount callback
    return () => {
      g?.unmountGame();
    };
  }, [gameFgRef, gameRef, songInfo]);

  return (
    <>
      <div className="container">
        <div id="stage" className={`${slanted && "slanted"}`}>
          <canvas
            id="playfieldBg"
            width={gameWidth}
            height={gameHeight}
            ref={gameBgRef}
          />
          <canvas
            id="playfieldOverlay"
            width={gameWidth}
            height={gameHeight}
            ref={gameFgRef}
          />
          <canvas
            id="playfield"
            width={gameWidth}
            height={gameHeight}
            ref={gameRef}
          />
        </div>
      </div>

      <style jsx>{`
        .container {
          height: ${gameHeight}px;
          width: ${gameWidth}px;
        }
        #stage {
          width: 100%;
          height: 100%;
          position: relative;
          box-sizing: content-box;
          transition-duration: 2000ms;
          box-shadow: 3px 3px 44px -5px rgba(0, 0, 0, 0.5);
        }
        #stage.slanted {
          transform: matrix3d(
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            -0.0025,
            0,
            0,
            1,
            0,
            0,
            -180,
            0,
            1.35
          );
        }
        canvas {
          position: absolute;
        }
        #playfieldBg {
          z-index: 1;
          background: #343434;
        }
        #playfield {
          z-index: 2;
        }
        #playfieldOverlay {
          z-index: 3;
        }
      `}</style>
    </>
  );
};

export default ManiaCanvas;

// const playfield = (ref) => {
//   const canvas = ref.current;
//   // ref.current.toPlay = false;

//   let ptrStart = 0;
//   let ptrEnd = 0;
//   // let canPlay = false;
//   let frameCount = 0;
//   let context = canvas.getContext("2d");
//   let notes = gameOptions.song.notes;
//   // let audio = new Audio(gameOptions.song.audioUrl);
//   let { scrollSpeed, volume } = gameOptions;
//   let { noteWidth } = skinOptions;
//   audio.volume = volume;

//   let songNotes = Object.values(notes);

//   let animationFrame;

//   const render = () => {
//     frameCount++;
//     let { currentTime } = audio;
//     let time = currentTime * 1000;
//     context.clearRect(0, 0, canvas.width, canvas.height);

//     songNotes.forEach((timeStep) => {
//       timeStep.forEach((note) => {
//         let dt = time - note.t_hit;
//         let dy = dt * 0.05 * scrollSpeed + canvas.height;
//         if (dy > -100) {
//           context.fillStyle = laneColorMap[7][note.col];
//           context.fillRect((note.col - 1) * noteWidth, dy, noteWidth, 10);
//         }
//       });
//     });

//     animationFrame = window.requestAnimationFrame(render);
//   };
//   render();

//   return () => {
//     window.cancelAnimationFrame(animationFrame);
//     audio.removeEventListener("canplay", onCanPlay);
//     audio.pause();
//     document
//       .getElementById("playfield")
//       .removeEventListener("click", onFieldClick);
//   };
// };

// const playfieldOverlay = (ref, controller) => {
//   const canvas = ref.current;
//   const { judgePos, noteWidth } = skinOptions;
//   let ctx = canvas.getContext("2d");

//   let animationFrame;

//   const render = () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // 1px border below judge
//     ctx.fillStyle = "rgba(0, 0, 0, 1)";
//     ctx.fillRect(0, canvas.height - judgePos, canvas.width, 1);

//     // judge line
//     ctx.fillStyle = "rgba(250, 100, 100, 0.4)";
//     ctx.fillRect(0, canvas.height - judgePos - 10, canvas.width, 10);

//     // interactive piano keys
//     ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
//     Object.values(controller.activeCols).forEach((col, i) => {
//       if (col) {
//         ctx.fillRect(noteWidth * i, canvas.height - judgePos, noteWidth, 50);
//       }
//     });
//     animationFrame = window.requestAnimationFrame(render);
//   };
//   render();

//   return () => {
//     window.cancelAnimationFrame(animationFrame);
//   };
// };

// const playfieldBg = (ref) => {
//   const canvas = ref.current;
//   const { judgePos } = skinOptions;
//   let ctx = canvas.getContext("2d");
//   let animationFrame;

//   const render = () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     // ctx.fillStyle = "rgba(20, 20, 20, 1)";
//     // ctx.fillRect(0, 0, canvas.width, canvas.height - judgePos);

//     animationFrame = window.requestAnimationFrame(render);
//   };
//   render();

//   return () => {
//     window.cancelAnimationFrame(animationFrame);
//   };
// };
