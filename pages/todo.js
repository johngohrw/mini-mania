import { songs } from "../data/songs";
import Layout from "./_layout";

export default function Todo() {
  return (
    <>
      <Layout
        panelContent={<></>}
        content={
          <div className="page">
            <h1 style={{ marginBottom: 0 }}>to do</h1>
            <ul>
              <li>handle long notes (!)</li>
              <li>judgment system (!)</li>
              <li>fix scaling when on slant mode</li>
              <li>game menu and scene loading</li>
              <li>key configuration</li>
              <li>combo keeping</li>
              <li>score keeping & calculation</li>
              <li>full skinning support</li>
              <li>song selection menu</li>
              <li>automatic chart conversion from .osu beatmap files</li>
            </ul>
          </div>
        }
      />

      <style jsx>{`
        .page {
          max-width: 600px;
          width: 100%;
          background: white;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          padding: 2rem 3rem;

          font-size: 14px;
        }
      `}</style>

      <style jsx global>{`
        main {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8rem 1rem 1rem;
        }
      `}</style>
    </>
  );
}
