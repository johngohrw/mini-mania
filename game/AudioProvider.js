export class AudioProvider {
  constructor({ url, onCanPlayFunction }) {
    console.log("[AudioProvider] loading song:", url);
    this.instance = url ? new Audio(url) : null;

    if (onCanPlayFunction) {
      this.instance.addEventListener("canplay", onCanPlayFunction);
    }
  }

  loadSong({ url }) {
    this.instance.removeEventListener("canplay", onCanPlayFunction); // not sure if this works
    this.instance = new Audio(url);
    this.instance.addEventListener("canplay", onCanPlayFunction);
  }

  onCanPlay() {
    onCanPlayFunction();
  }

  // plays the song
  play() {}

  // pauses the song
  pause() {}

  getNode() {
    return this.instance;
  }

  setAudioAttribute(key, value) {
    this.instance[key] = value;
  }
}
