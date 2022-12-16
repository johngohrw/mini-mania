export class AudioProvider {
  constructor(url) {
    this.instance = url ? new Audio(url) : null;
  }

  loadSong({ url }) {
    this.instance = new Audio(url);
  }

  // plays the song
  play() {}

  // pauses the song
  pause() {}
}
