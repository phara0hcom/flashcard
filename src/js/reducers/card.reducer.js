import {
  FLIP,
  ANSWER_QUESTION,
  INITIATE_SCORES_PENDING,
  INITIATE_SCORES_FULFILLED,
  INITIATE_SCORES_REJECTED,
  UPDATE_SCORES,
  RESET_LAST_ANSWER,
  NEXT_QUESTION_PENDING,
  NEXT_QUESTION_FULFILLED,
  NEXT_QUESTION_REJECTED
} from "../constants/card.constant";

import { FLIPcard, checkAnswer } from "../functions/card.reducer";
import { getPastScore, getCardScore } from "../functions/card.localstorage";
import { getCurrentSymbol } from "../functions/card.decks";
import { basicHiragana } from "../decks/hiragana";

const initialState = {
  face: "UP",
  deck: "basicHiragana",
  deckFunc: "RANDOM",
  fetchingScore: false,
  fetchScoreError: false,
  symbolNr: 0,
  last_answer: null,
  answered: [],
  score: {
    questions_failed: 0,
    questions_correct: 0
  },
  pastScore: {
    questions_failed: 0,
    questions_correct: 0
  },
  cardScore: {
    questions_failed: 0,
    questions_correct: 0
  }
};

const card = (state = initialState, action) => {
  switch (action.type) {
    case FLIP:
    
      return FLIPcard(state.face, state);

    case ANSWER_QUESTION:

      return checkAnswer(state, action);

    //might not need this
    case UPDATE_SCORES:
      console.log("UPDATED SCORES", action);
      return {
        ...state,
        pastScore: action.pastScore,
        cardScore: action.cardScore
      };

    case INITIATE_SCORES_PENDING:
      console.log("INITIATE_SCORES_PENDING");
      return { 
        ...state,
        fetchingScore: true
      };

    case INITIATE_SCORES_FULFILLED:
      console.log("INITIATE_SCORES_FULFILLED");
      return { 
        ...state,
        fetchingScore: false,
        pastScore: action.payload.pastScore,
        cardScore: action.payload.cardScore
      };

    case INITIATE_SCORES_REJECTED:
      console.log("INITIATE_SCORES_REJECTED");
      return { 
        ...state,
        fetchingScore: false,
        fetchScoreError: true
      };

    case RESET_LAST_ANSWER:
      return { 
        ...state,
        last_answer: null
      };

    case NEXT_QUESTION_PENDING:
      console.log("NEXT_QUESTION_PENDING");
      return { 
        ...state,
        fetchingScore: true
      };

    case NEXT_QUESTION_REJECTED:
      console.log("NEXT_QUESTION_REJECTED");
      return { 
        ...state,
        fetchingScore: false,
        fetchScoreError: true
      };

    case NEXT_QUESTION_FULFILLED:
      console.log("NEXT_QUESTION_FULFILLED");
      console.log("action.payload", action.payload);
      return { 
        ...state,
        fetchingScore: false,
        face: "UP",
        answered: [],
        symbolObj: action.payload.symbolObj,
        cardScore: action.payload.cardScore,
        symbolNr: action.payload.symbolNr
      };

    default:

      return { 
        ...state,
        symbolObj: getCurrentSymbol(state.deck, state.symbolNr)
      };
  }
};

export default card;