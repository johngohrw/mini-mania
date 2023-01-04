import React, { useRef, useEffect, useState } from "react";
import { GameController } from "../game/GameController";
import { songs } from "../data/songs";

let mockSongInfo = songs[3];

const ManiaCanvas = ({ songInfo = mockSongInfo, ...rest }) => {
  const gameBgRef = useRef(null);
  const gameRef = useRef(null);
  const gameFgRef = useRef(null);
  const [gamePaused, setGamePaused] = useState(true);
  const [game, setGame] = useState(null);
  const [scrollSpeed, setScrollSpeed] = useState(2);

  useEffect(() => {
    game?.adjustOption("scrollSpeed", scrollSpeed);
  }, [scrollSpeed]);

  // initialise game controller
  useEffect(() => {
    let g;
    if (gameFgRef.current && gameRef.current) {
      g = new GameController({
        fgCanvas: gameFgRef.current,
        bgCanvas: gameBgRef.current,
        gameCanvas: gameRef.current,
        songInfo: songInfo,
        initialOptions: { gameVolume: 0.1, scrollSpeed: scrollSpeed }, // test
      });
      setGame(g);
    }

    // call unmount callback
    return () => {
      g?.unmountGame();
    };
  }, [gameFgRef, gameRef]);

  return (
    <>
      scrollSpeed{" "}
      <button onClick={() => setScrollSpeed(scrollSpeed - 1)}>-</button>
      {scrollSpeed}
      <button onClick={() => setScrollSpeed(scrollSpeed + 1)}>+</button>
      <button
        onClick={() => {
          setGamePaused(!gamePaused);
          game?.gameTogglePausePlay();
        }}
      >
        {gamePaused ? "play" : "pause"}
      </button>
      <div id="stage">
        <canvas
          id="playfieldBg"
          width={game?.skin?.noteWidth * 7 || 0}
          height={640}
          ref={gameBgRef}
        />
        <canvas
          id="playfieldOverlay"
          width={game?.skin?.noteWidth * 7 || 0}
          height={640}
          ref={gameFgRef}
        />
        <canvas
          id="playfield"
          width={game?.skin?.noteWidth * 7 || 0}
          height={640}
          ref={gameRef}
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
