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

const FLIPcard = (current, state ) => {
  switch (current) {
    case "UP":
      return { ...state, face: "DOWN" };
    default:
      return { ...state, face: "UP" };
  }
};

const checkAnswer = (state, answer) => {
  const correct_ans = basicHiragana[state.symbolNr].roman;
  const NewScore = state.score;

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
      face: "DOWN",
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
    
      return FLIPcard(state.face, state);

    case ANSWER_QUESTION:

      return checkAnswer(state, action.value);

    default:

      return { ...state, symbolObj: basicHiragana[state.symbolNr] };
  }
};

export default card;