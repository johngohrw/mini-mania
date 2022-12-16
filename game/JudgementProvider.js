// Window values are unidirectional. In other words,
// the value only includes either one early or late direction,
// and NOT BOTH early AND late direction.
// e.g: 10ms window = 20ms after including both late and early
const defaultRules = {
  windows: {
    perfect: 20,
    great: 50,
    good: 100,
    bad: 200,
    miss: 300,
  },
};

// REQUIREMENT: also handle long notes
export class JudgementProvider {
  constructor({ rules, notesOnField }) {
    this.rules = rules || defaultRules;
    this.notes = notesOnField; // subscribe to currently-valid notes on field
    this.processedRules = rules; // TODO: pre-process rules for optimized window-checking
  }

  // time of key event, which column, and whether if its keydown or keyup
  handleKeyEvent(timestamp, column, type) {
    // check if any note on field is within hittable range
    // ...
    // calculate window between timestamp and nearest hittable note (prioritize older notes)
    // ...
    // decide judgement based on window
    // ...
    // trigger feedbacks (TODO: need some sort of fast-subscription or callback-based solution)
    // ...
    // update score
  }

  updateScore(oldScore) {
    return;
  }
}
