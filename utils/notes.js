// convert notes from string[] format to a Note Array Type
export function convertNotes(notesArray) {
  let result = {};
  let note, lastCol;
  for (let i = 0; i < notesArray.length; i++) {
    note = notesArray[i].split(",");
    lastCol = note[5].split(":");
    result[note[2]] = {
      x: parseInt(note[0]),
      t_hit: parseInt(note[2]),
      t_release: lastCol[0] !== "0" ? parseInt(lastCol[0]) : undefined,
    };
  }
  return result;
}
