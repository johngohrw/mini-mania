import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { convertNotes } from "../game/notes";

// note conversion from string[] to Note Array type
test("note conversion", () => {
  const test = {
    input: [
      "192,192,18596,1,0,0:0:0:0:",
      "320,192,19047,1,0,0:0:0:0:",
      "448,192,19499,128,0,21303:0:0:0:0:",
      "64,192,19950,1,0,0:0:0:0:",
      "320,192,20401,1,0,0:0:0:0:",
    ],
    output: {
      18596: [{ col: 2, t_hit: 18596, t_release: undefined }],
      19047: [{ col: 3, t_hit: 19047, t_release: undefined }],
      19499: [{ col: 4, t_hit: 19499, t_release: 21303 }],
      19950: [{ col: 1, t_hit: 19950, t_release: undefined }],
      20401: [{ col: 3, t_hit: 20401, t_release: undefined }],
    },
  };
  expect(convertNotes(test.input)).toStrictEqual(test.output);
});

// note conversion with chord notes and hitsound information
test("note conversion 2", () => {
  const test = {
    input: [
      "288,192,21089,1,0,0:0:0:70:soft-hitclap.wav",
      "416,192,21267,1,0,0:0:0:40:cymbol01.wav",
      "96,192,21267,1,0,0:0:0:70:bassdrum.wav",
      "32,192,21267,1,0,0:0:0:0:",
      "160,192,21446,1,0,0:0:0:0:",
      "352,192,21624,1,0,0:0:0:70:soft-hitclap.wav",
      "480,192,21803,1,0,0:0:0:40:cymbol01.wav",
      "96,192,21803,1,0,0:0:0:70:bassdrum.wav",
    ],
    output: {
      21089: [{ col: 4, t_hit: 21089, t_release: undefined }],
      21267: [
        { col: 6, t_hit: 21267, t_release: undefined },
        { col: 2, t_hit: 21267, t_release: undefined },
        { col: 1, t_hit: 21267, t_release: undefined },
      ],
      21446: [{ col: 3, t_hit: 21446, t_release: undefined }],
      21624: [{ col: 5, t_hit: 21624, t_release: undefined }],
      21803: [
        { col: 7, t_hit: 21803, t_release: undefined },
        { col: 2, t_hit: 21803, t_release: undefined },
      ],
    },
  };
  expect(convertNotes(test.input)).toStrictEqual(test.output);
});
