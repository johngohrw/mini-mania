import Head from "next/head";
import ManiaCanvas from "../components/ManiaCanvas";

import { songs } from "../data/songs";
import { useState } from "react";

const getSong = (currentIndex, increment) => {
  const length = Object.keys(songs).length;
  return (currentIndex + increment + length) % length;
};

export default function Home() {
  const [songIndex, setSongIndex] = useState(0);

  useState(() => {}, [songIndex]);

  return (
    <div className="app">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">a canvas experiment</h1>

        <div>
          {songs[songIndex].name} - {songs[songIndex].artist}
        </div>
        <div>
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
        <div className="gameContainer">
          <ManiaCanvas songInfo={songs[songIndex]} />
        </div>
      </main>

      <style jsx>{`
        .app {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          display: flex;
          flex-direction: column;
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
      `}</style>
    </div>
  );
}
