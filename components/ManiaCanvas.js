import React, { useRef, useEffect } from "react";
import testSong from "../public/songs/Dormir - Sayonara Trip/Dormir - Sayonara Trip (Simple_Star) [4K LV.5].json";

const ManiaCanvas = (props) => {
  const canvasRef = useRef(null);
  const notes = convertNotes(testSong.notes);
  // const song = new Audio("/songs/Dormir - Sayonara Trip/Sayonara Trip.mp3");
  // console.log("s", song);

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawNotes = (ctx, frameCount, time, notes) => {};

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;
    console.log(performance);

    //Our draw came here
    const render = () => {
      frameCount++;

      drawNotes(context, frameCount, 0, notes);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    const bindKeys = () => {};

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return (
    <>
      <canvas ref={canvasRef} {...props} />
      <style jsx>{`
        canvas {
          height: 500px;
          width: 500px;
        }
      `}</style>
    </>
  );
};

export default ManiaCanvas;


// console.log(testSong);
// const notes = convertNotes(testSong.notes);
// console.log(notes);
