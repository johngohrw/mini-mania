test("note conversion", () => {
  const test = {
    input: [
      "320,192,1453,1,0,0:0:0:0:",
      "448,192,1905,1,0,0:0:0:0:",
      "192,192,2356,1,0,0:0:0:0:",
      "320,192,2807,1,0,0:0:0:0:",
      "192,192,3258,1,0,0:0:0:0:",
      "64,192,3709,1,0,0:0:0:0:",
      "320,192,4160,1,0,0:0:0:0:",
    ],
    output: 0,
  };
  expect(convertNotes(test.input)).toBe(test.output);
});

function convertNotes(notesArray) {
  let result = {};
  let note;
  for (let i = 0; i < notesArray.length; i++) {
    note = notesArray[i].split(",");
    result[note[2]] = {
      0: parseInt(note[0]),
      1: parseInt(note[1]),
      time: parseInt(note[2]),
      3: parseInt(note[3]),
      4: parseInt(note[4]),
      5: note[5],
    };
  }

  return result;
}

console.log(
  convertNotes(
    "320,192,1453,1,0,0:0:0:0:",
    "448,192,1905,1,0,0:0:0:0:",
    "192,192,2356,1,0,0:0:0:0:",
    "320,192,2807,1,0,0:0:0:0:",
    "192,192,3258,1,0,0:0:0:0:",
    "64,192,3709,1,0,0:0:0:0:",
    "320,192,4160,1,0,0:0:0:0:"
  )
);
