import React, { useRef, useEffect } from "react";
import testSong from "../public/songs/Dormir - Sayonara Trip/Dormir - Sayonara Trip (Simple_Star) [4K LV.5].json";
import { convertNotes } from "../utils/notes";

const ManiaCanvas = (props) => {
  const notesCanvasRef = useRef(null);
  const uiCanvasRef = useRef(null);
  const backgroundCanvasRef = useRef(null);

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

  useEffect(() => {
    const canvas = notesCanvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#fff";
    const notes = convertNotes(testSong.notes);
    let notesInRenderRange = [];
    let frameCount = 0,
      audioTime = 0;
    let animationFrameId;
    let yOffset = context.canvas.height - 100;
    let scrollSpeed = 20;
    let audio = new Audio("./songs/Dormir - Sayonara Trip/Sayonara Trip.mp3");

    // start audio when ready to play
    audio.addEventListener("canplay", (event) => {
      audio.play();
    });

    //Our draw came here
    const render = () => {
      frameCount++;
      // context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      // audioTime = Math.floor(audio.currentTime * 1000);
      // if (notes) {
      //   drawNotes(context, audioTime, notes, scrollSpeed, yOffset);
      // }
      context.fillRect(10, frameCount * 11, 48, 10);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [drawNotes]);

  return (
    <>
      <div id="stage">
        <canvas
          className="notes"
          width={800}
          height={600}
          ref={notesCanvasRef}
          {...props}
        />
        <canvas
          className="ui"
          width={800}
          height={600}
          ref={uiCanvasRef}
          {...props}
        />
        <canvas
          className="background"
          width={800}
          height={600}
          ref={backgroundCanvasRef}
          {...props}
        />
      </div>

      <style jsx>{`
        #stage {
          width: 800px;
          height: 600px;
          position: relative;
          border: 2px solid black;
        }
        canvas {
          position: absolute;
        }
        .background {
          z-index: 1;
        }
        .notes {
          z-index: 2;
        }
        .ui {
          z-index: 3;
        }
      `}</style>
    </>
  );
};

export default ManiaCanvas;
