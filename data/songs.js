import { convertNotes } from "../game/notes";

import testSong from "../public/songs/Dormir - Sayonara Trip/Dormir - Sayonara Trip (Simple_Star) [4K LV.5].json";
import loosSong from "../public/songs/128855 Loos - Koi Yomi Zakura/Loos - Koi Yomi Zakura (_S u w a k o_) [7K Lv.36].json";
import yoasobiYoruNiKakeruSong from "../public/songs/1299810 YOASOBI - Yoru ni Kakeru/YOASOBI - Yoru ni Kakeru (arcwinolivirus) [7K Blind My Sight].json";
import lapisSong from "../public/songs/1652458 SHIKI - Lapis/SHIKI - Lapis (-NoName-) [Another].json";

export const songs = {
  0: {
    name: "Yoru ni Kakeru",
    artist: "YOASOBI",
    notes: convertNotes(yoasobiYoruNiKakeruSong.notes, 70),
    url: "./songs/1299810 YOASOBI - Yoru ni Kakeru/audio.mp3",
    keys: 7,
  },
  1: {
    name: "Sayonara Trip",
    artist: "Dormir",
    notes: convertNotes(testSong.notes),
    url: "./songs/Dormir - Sayonara Trip/Sayonara Trip.mp3",
    keys: 7,
  },
  2: {
    name: "Koi Yomi Zakura",
    artist: "Loos",
    notes: convertNotes(loosSong.notes, 68.6),
    url: "./songs/128855 Loos - Koi Yomi Zakura/loos - Omoi Yoshino.mp3",
    keys: 7,
  },
  3: {
    name: "Lapis",
    artist: "SHIKI",
    notes: convertNotes(lapisSong.notes),
    url: "./songs/1652458 SHIKI - Lapis/audio.mp3",
    keys: 7,
  },
};
