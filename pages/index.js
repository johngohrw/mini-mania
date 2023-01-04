import Head from "next/head";
import ManiaCanvas from "../components/ManiaCanvas";

export default function Home() {
  return (
    <div className="app">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">a canvas experiment</h1>

        <div className="gameContainer">
          <ManiaCanvas />
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
