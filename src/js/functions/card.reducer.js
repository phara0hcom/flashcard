import { getCurrentSymbol } from "./card.decks"

export const FLIPcard = (current, state) => {
  switch (current) {
    case "UP":
      return { ...state, face: "DOWN" };
    default:
      return { ...state, face: "UP" };
  }
};

export const checkAnswer = (state, answer) => {
    const correct_ans = state.symbolObj.roman;
    const NewScore = state.score;

    if (correct_ans !== answer) {
        return {
            ...state,
            score: {
                ...NewScore,
                questions_failed: NewScore.questions_failed + 1
            }
    };
    } else {
        return {
            ...state,
            face: "DOWN",
            score: {
                ...NewScore,
                questions_correct: NewScore.questions_correct + 1
            }
        };
    }
}
