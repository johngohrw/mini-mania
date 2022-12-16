import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AudioProvider } from "../game/AudioProvider";
import { songs } from "../data/songs";

// instantiate class
test("instantiating AudioProvider class", () => {
  const provider = new AudioProvider();
  expect(provider).toHaveProperty("instance");
});

// load song
test("loading song", () => {
  const audio = new AudioProvider();
  audio.loadSong(songs[Object.keys(songs)[0]].url);
  expect(audio.instance.readyState).toBe(0);
});
