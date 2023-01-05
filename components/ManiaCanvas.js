import React, { useRef, useEffect, useState } from "react";
import { GameController } from "../game/GameController";

import { SkinProvider } from "../game/SkinProvider";

const gameScale = 2;
const skin = new SkinProvider({ gameScale: 1 });

const ManiaCanvas = ({ songInfo, ...rest }) => {
  const gameBgRef = useRef(null);
  const gameRef = useRef(null);
  const gameFgRef = useRef(null);
  const [gamePaused, setGamePaused] = useState(true);
  const [game, setGame] = useState(null);
  const [debugMode, setDebugMode] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(10);
  const [slanted, setSlanted] = useState(true);

  const gameWidth = skin?.noteWidth * songInfo?.keys;
  const gameHeight = 640;

  useEffect(() => {
    game?.adjustOption("scrollSpeed", scrollSpeed);
  }, [scrollSpeed]);

  useEffect(() => {
    game?.set("debug", debugMode);
  }, [debugMode]);

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
        initialOptions: { gameVolume: 0.1, scrollSpeed: scrollSpeed }, // test
        gameScale: gameScale,
      });
      setGame(g);
    }

    // call unmount callback
    return () => {
      g?.unmountGame();
      setGamePaused(true);
    };
  }, [gameFgRef, gameRef, songInfo]);

  return (
    <>
      <div className="options">
        {/* <button onClick={() => {}}>change song (not working yet)</button> */}
        <div>
          scrollSpeed{" "}
          <button onClick={() => setScrollSpeed(scrollSpeed - 1)}>-</button>{" "}
          {scrollSpeed}{" "}
          <button onClick={() => setScrollSpeed(scrollSpeed + 1)}>+</button>
        </div>
        <button
          onClick={() => {
            setGamePaused(!gamePaused);
            game?.gameTogglePausePlay();
          }}
        >
          {gamePaused ? "play" : "pause"}
        </button>
        <div>
          <input
            type="checkbox"
            checked={slanted}
            onChange={(e) => setSlanted(e.target.checked)}
          />
          slant mode
        </div>
        <div>
          <input
            type="checkbox"
            checked={debugMode}
            onChange={(e) => setDebugMode(e.target.checked)}
          />
          debug
        </div>
      </div>

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
      <style jsx>{`
        .options {
          margin-bottom: 1rem;
        }
        #stage {
          height: ${gameHeight}px;
          width: ${gameWidth}px;
          position: relative;
          border: 1px solid black;
          box-sizing: content-box;
          transition-duration: 2000ms;
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
            -206,
            0,
            1.3
          );
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
