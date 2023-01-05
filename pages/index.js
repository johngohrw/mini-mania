import Head from "next/head";
import ManiaCanvas from "../components/ManiaCanvas";

import { songs } from "../data/songs";
import { useEffect, useState } from "react";

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
    <div className="app">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="panel">
          <h1 className="title">a canvas experiment</h1>

          <div className="row">
            {songs[songIndex].name} - {songs[songIndex].artist}
          </div>
          <div className="row">
            <button
              style={{ marginBottom: "0.2rem", marginRight: "0.2rem" }}
              onClick={() => setSongIndex(getSong(songIndex, -1))}
            >
              prev song
            </button>
            <button
              style={{ marginBottom: "0.2rem" }}
              onClick={() => setSongIndex(getSong(songIndex, 1))}
            >
              next song
            </button>
          </div>
          <div className="row">
            scrollSpeed{" "}
            <button onClick={() => setScrollSpeed(scrollSpeed - 1)}>-</button>{" "}
            {scrollSpeed}{" "}
            <button onClick={() => setScrollSpeed(scrollSpeed + 1)}>+</button>
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
              Volume:{" "}
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
      </main>

      <style jsx>{`
        .app {
          min-height: 100vh;
          padding: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: #878787;
        }

        main {
          display: flex;
          flex-direction: column;
        }

        .panel {
          position: fixed;
          z-index: 100;
          top: 0;
          left: 0;

          padding: 1rem 1.5rem;
          margin: 1rem;

          border-radius: 8px;
          background: #f3f3f3;

          font-size: 12px;
        }

        .panel button {
          font-size: 12px;
        }

        .title {
          margin: 0 0 0.5rem;
          font-size: 24px;
        }
        .panel .row {
          margin-bottom: 0.2rem;
        }
        .gameContainer {
          box-sizing: border-box;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
        #__next {
          position: relative;
        }
      `}</style>
    </div>
  );
}
