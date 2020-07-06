export default class Music {
  constructor() {
    this.soundOn = true;
    this.musicOn = true;
    this.bgMusicPlaying = false;
  }

  set musicOn(value) {
    this.musicOn = value;
  }

  get musicOn() {
    return this.musicOn;
  }

  set soundOn(value) {
    this.soundOn = value;
  }

  get soundOn() {
    return this.soundOn;
  }

  set bgMusicPlaying(value) {
    this.bgMusicPlaying = value;
  }

  get bgMusicPlaying() {
    return this.bgMusicPlaying;
  }
}