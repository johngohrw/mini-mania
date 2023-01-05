import Head from "next/head";
import ManiaCanvas from "../components/ManiaCanvas";

import { songs } from "../data/songs";
import { useEffect, useState } from "react";
import Layout from "./_layout";

const getSong = (currentIndex, increment) => {
  const length = Object.keys(songs).length;
  return (currentIndex + increment + length) % length;
};

export default function Home() {
  const [songIndex, setSongIndex] = useState(0);
  const [paused, setPaused] = useState(true);
  const [scrollSpeed, setScrollSpeed] = useState(10);
  const [debugMode, setDebugMode] = useState(false);
  const [slanted, setSlanted] = useState(false);
  const [volume, setVolume] = useState(0.2);

  useEffect(() => {
    setPaused(true);
  }, [songIndex]);

  return (
    <>
      <Layout
        panelContent={
          <>
            <div className="row">
              <div></div>
              {songs[songIndex].name} - {songs[songIndex].artist}
            </div>
            <div className="row">
              <button
                style={{ marginBottom: "0.2rem", marginRight: "0.2rem" }}
                onClick={() => setSongIndex(getSong(songIndex, -1))}
              >
                prev track
              </button>
              <button
                style={{ marginBottom: "0.2rem" }}
                onClick={() => setSongIndex(getSong(songIndex, 1))}
              >
                next track
              </button>
            </div>

            <div className="row" style={{ display: "flex" }}>
              <button
                style={{ marginRight: ".5rem" }}
                onClick={() => {
                  setPaused(!paused);
                }}
              >
                {paused ? "play" : "pause"}
              </button>
              <div style={{ display: "flex", alignItems: "center" }}>
                volume:{" "}
                <input
                  type="range"
                  min="0"
                  max="100"
                  style={{ width: "100px" }}
                  value={parseInt(volume * 100)}
                  onChange={(e) => {
                    setVolume(parseInt(e.target.value) / 100);
                  }}
                />
              </div>
            </div>
            <div className="row">
              scroll speed{" "}
              <button onClick={() => setScrollSpeed(scrollSpeed - 1)}>-</button>{" "}
              {scrollSpeed}{" "}
              <button onClick={() => setScrollSpeed(scrollSpeed + 1)}>+</button>
            </div>
            <div className="row">
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
                debug mode
              </div>
            </div>
          </>
        }
        content={
          <div className="gameContainer">
            <ManiaCanvas
              slanted={slanted}
              debugMode={debugMode}
              scrollSpeed={scrollSpeed}
              paused={paused}
              songInfo={songs[songIndex]}
              volume={volume}
            />
          </div>
        }
      />

      <style jsx>{`
        .row {
          margin-bottom: 0.4rem;
        }
        .gameContainer {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}
