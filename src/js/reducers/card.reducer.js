import { FLIP } from "../constants/card.constant";
import { ANSWER_QUESTION } from "../constants/card.constant";
import { basicHiragana } from "../decks/hiragana";

const initialState = {
  face: "UP",
  symbolNr: 0,
  last_answer: null,
  score: { 
    questions_played : 0,
    questions_failed : 0,
    questions_correct : 0
  }
};

const FLIPcard = ( current ) => {
    switch (current) {
      case "UP":
        return "DOWN";
      default:
        return "UP";
    }
}

const checkAnswer = (state, answer) => {
    const correct_ans = basicHiragana[state.symbolNr].roman;
    const NewScore = state.score;
    console.log("correct_ans", correct_ans )
    console.log("answer", answer )
    console.log("if", correct_ans !== answer )
    if ( correct_ans !== answer )
    {
        return {
            ...state,
            score: { 
              ...NewScore,
              questions_failed: NewScore.questions_failed + 1
            }
        }
    }
    else
    {
      return {
        ...state,
        symbolNr: state.symbolNr + 1,
        symbolObj: basicHiragana[state.symbolNr + 1],
        score: {
          ...NewScore,
          questions_failed: NewScore.questions_correct + 1
        }
      }

    }
}

const card = (state = initialState, action) => {
  switch (action.type) {
    case FLIP:
      return { ...state, face: FLIPcard(state.face) };
    case ANSWER_QUESTION:

      return checkAnswer(state, action.value);

    default:
      return { ...state, symbolObj: basicHiragana[state.symbolNr] };
  }
};

export default card;