import React, { useRef, useEffect } from "react";
import testSong from "../public/songs/Dormir - Sayonara Trip/Dormir - Sayonara Trip (Simple_Star) [4K LV.5].json";
import loosSong from "../public/songs/128855 Loos - Koi Yomi Zakura/Loos - Koi Yomi Zakura (_S u w a k o_) [7K Lv.36].json";
import { convertNotes } from "../utils/notes";

const song = {
  notes: convertNotes(testSong.notes),
  audioUrl: "./songs/Dormir - Sayonara Trip/Sayonara Trip.mp3",
};

const song2 = {
  notes: convertNotes(loosSong.notes),
  audioUrl: "./songs/128855 Loos - Koi Yomi Zakura/loos - Omoi Yoshino.mp3",
};

const gameOptions = {
  judgePosition: 100,
  scrollSpeed: 20,
  song: song2,
};

const ManiaCanvas = (props) => {
  const playfieldRef = useRef(null);

  const drawNotes = (ctx, time, notes, speed, yOffset) => {
    // Object.values(notes).forEach((note) => {
    //   const dt = time - note.t_hit;
    //   const x = Math.floor(note.x / 2);
    //   const dy = Math.floor(dt * speed * 0.05);
    //   ctx.fillRect(x, dy + yOffset, 48, 10);
    // });
    const note = Object.values(notes)[0];
    const dt = time - note.t_hit;
    const x = Math.floor(note.x / 2);
    const dy = Math.floor(dt * speed * 0.05);
    ctx.fillRect(x, dy + yOffset, 48, 10);
  };

  const init = (canvas, gameOptions) => {
    return {
      ptrStart: 0,
      ptrEnd: 0,
      frameCount: 0,
      context: canvas.getContext("2d"),
      notes: gameOptions.song.notes,
      audio: new Audio(gameOptions.song.audioUrl),
    };
  };

  useEffect(() => {
    const canvas = playfieldRef.current;

    let { ptrStart, ptrEnd, frameCount, context, notes, audio } = init(
      canvas,
      gameOptions
    );
    let { scrollSpeed } = gameOptions;

    let noteArray = Object.values(notes);

    console.log(notes);

    let animationFrame;

    // start audio when ready to play
    const onCanPlay = () => {
      audio.play();
    };
    audio.addEventListener("canplay", onCanPlay);

    const onFieldClick = () => {
      console.log("click");
    };
    document
      .getElementById("playfield")
      .addEventListener("click", onFieldClick);

    const render = () => {
      frameCount++;
      let { currentTime } = audio;
      let time = currentTime * 1000;
      context.clearRect(0, 0, canvas.width, canvas.height);

      noteArray.forEach((note) => {
        let dt = time - note.t_hit;
        let dy = dt * 0.05 * scrollSpeed + canvas.height;
        context.fillRect((note.col - 1) * 42, dy, 42, 10);
      });

      animationFrame = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      audio.removeEventListener("canplay", onCanPlay);
      document
        .getElementById("playfield")
        .removeEventListener("click", onFieldClick);
    };
  }, [drawNotes]);

  return (
    <>
      <div id="stage">
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
      `}</style>
    </>
  );
};

export default ManiaCanvas;
