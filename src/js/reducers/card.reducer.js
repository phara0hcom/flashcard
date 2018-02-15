import {
  FLIP,
  ANSWER_QUESTION,
  INITIATE_SCORES_PENDING,
  INITIATE_SCORES_FULFILLED,
  INITIATE_SCORES_REJECTED,
  UPDATE_SCORES
} from "../constants/card.constant";

import { getPastScore, getCardScore } from "../functions/card.localstorage";
import { getCurrentSymbol } from "../functions/card.decks";
import { basicHiragana } from "../decks/hiragana";

const initialState = {
  face: "UP",
  deck: "basicHiragana",
  fetchingScore: false,
  fetchScoreError: false,
  symbolNr: 0,
  last_answer: null,
  score: {
    questions_played: 0,
    questions_failed: 0,
    questions_correct: 0
  },
  pastScore: {
    questions_played: 0,
    questions_failed: 0,
    questions_correct: 0
  },
  cardScore: {
    questions_played: 0,
    questions_failed: 0,
    questions_correct: 0
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

    case UPDATE_SCORES:
      console.log("UPDATED SCORES", action);

      return {
        ...state,
        pastScore: action.pastScore,
        cardScore: action.cardScore
      };

    case INITIATE_SCORES_PENDING:
      console.log("INITIATE_SCORES_PENDING");
      //getCardScore( basicHiragana, state.symbolNr );
      return { 
        ...state,
        fetchingScore: true
      };

    case INITIATE_SCORES_FULFILLED:
      console.log("INITIATE_SCORES_FULFILLED");
      //getCardScore( basicHiragana, state.symbolNr );
      return { 
        ...state,
        fetchingScore: false,
        pastScore: action.payload.pastScore,
        cardScore: action.payload.cardScore
      };

    case INITIATE_SCORES_REJECTED:
      console.log("INITIATE_SCORES_REJECTED");
      //getCardScore( basicHiragana, state.symbolNr );
      return { 
        ...state,
        fetchingScore: false,
        fetchScoreError: true
      };


    default:

      return { 
        ...state,
        symbolObj: getCurrentSymbol(state)
      };
  }
};


export default card;