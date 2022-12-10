import React, { useRef, useEffect } from "react";
import testSong from "../public/songs/Dormir - Sayonara Trip/Dormir - Sayonara Trip (Simple_Star) [4K LV.5].json";
import { convertNotes } from "../utils/notes";

const ManiaCanvas = (props) => {
  const canvasRef = useRef(null);
  const notes = convertNotes(testSong.notes);

  const drawNotes = (ctx, time, notes, speed, yOffset) => {
    Object.values(notes).forEach((note) => {
      const dt = time - note.t_hit;
      const x = note.x;
      const dy = dt * speed * 0.05;
      ctx.fillRect(note.x / 2, dy + yOffset, 48, 10);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0,
      audioTime = 0;
    let animationFrameId;
    let yOffset = context.canvas.height - 10;
    let scrollSpeed = 25;
    let audio = new Audio("./songs/Dormir - Sayonara Trip/Sayonara Trip.mp3");
    console.log(audio);

    // start audio when ready to play
    audio.addEventListener("canplay", (event) => {
      audio.play();
    });

    //Our draw came here
    const render = () => {
      frameCount++;
      if (frameCount % 120 === 0) {
        console.log(frameCount / 120);
      }

      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.fillStyle = "#000000";
      audioTime = audio.currentTime * 1000;

      if (notes) {
        drawNotes(context, audioTime, notes, scrollSpeed, yOffset);
      }

      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    const bindKeys = () => {};

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [drawNotes]);

  return (
    <>
      <canvas width={1280} height={800} ref={canvasRef} {...props} />
      <style jsx>{`
        canvas {
          width: 1280px;
          height: 800px;
        }
      `}</style>
    </>
  );
};

export default ManiaCanvas;
