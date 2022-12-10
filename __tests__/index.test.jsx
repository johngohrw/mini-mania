import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { convertNotes } from "../utils/notes";

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
      18596: { x: 192, t_hit: 18596, t_release: undefined },
      19047: { x: 320, t_hit: 19047, t_release: undefined },
      19499: { x: 448, t_hit: 19499, t_release: 21303 },
      19950: { x: 64, t_hit: 19950, t_release: undefined },
      20401: { x: 320, t_hit: 20401, t_release: undefined },
    },
  };
  expect(convertNotes(test.input)).toStrictEqual(test.output);
});
