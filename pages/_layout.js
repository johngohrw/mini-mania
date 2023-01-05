import Head from "next/head";

import { useEffect, useState } from "react";

export default function Layout({ panelContent, content }) {
  return (
    <div className="app">
      <Head>
        <title>a canvas experiment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="panel">
          <h1 className="title">a canvas experiment</h1>
          <div className="row">
            <a href="/">game</a>
            <a href="todo">todo</a>
          </div>
          {panelContent}
        </div>
        {content}
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
        .panel .row {
          margin-bottom: 0.4rem;
        }
        .panel a {
          margin-right: 0.5rem;
        }

        .title {
          margin: 0 0 0.5rem;
          font-size: 24px;
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
