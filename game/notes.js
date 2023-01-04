// convert notes from string[] format to a Note Array Type
export function convertNotes(notesArray, quantize = 0) {
  let result = {};
  let note, lastCol;

  // pass 1: get column mappings
  let colMapAux = [];
  for (let i = 0; i < notesArray.length; i++) {
    const col = parseInt(notesArray[i].split(",")[0]);
    if (!colMapAux.includes(col)) {
      colMapAux.push(col);
    }
  }
  colMapAux = colMapAux.sort((a, b) => a - b);
  let colMap;
  if (quantize > 0) {
    colMap = colMapAux.reduce((acc, curr) => {
      acc[curr] = Math.floor(curr / quantize) + 1;
      return acc;
    }, {});
  } else {
    colMap = colMapAux.reduce((acc, curr, i) => {
      acc[curr] = i + 1;
      return acc;
    }, {});
  }

  // pass 2: parse all notes
  for (let i = 0; i < notesArray.length; i++) {
    note = notesArray[i].split(",");
    if (!Object.prototype.hasOwnProperty.call(result, note[2])) {
      result[note[2]] = []; // initialize with empty array
    }
    lastCol = note[5].split(":");
    result[note[2]].push({
      col: colMap[parseInt(note[0])],
      t_hit: parseInt(note[2]),
      t_release: lastCol[0] !== "0" ? parseInt(lastCol[0]) : undefined,
    });
  }
  return result;
}

export const getInverseMap = (obj, transform = (val) => val) => {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    acc[v] = transform(k);
    return acc;
  }, {});
};
