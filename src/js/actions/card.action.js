import {
  FLIP,
  ANSWER_QUESTION,
  INITIATE_SCORES,
  UPDATE_SCORES
} from "../constants/card.constant";

import { getAllScores } from "../functions/card.localstorage";

console.log(getAllScores);

export const flip = () => {
  return {
    type: FLIP
  };
}

export const  click_answer = ( e ) =>  {
  return { 
    type: ANSWER_QUESTION,
    value: e.target.value
  };
}

export const update_scores = (pastScore, cardScore) => {
  return { 
    type: UPDATE_SCORES,
    pastScore,
    cardScore
  };
}

export const initiate_scores = (state) => {
  return { 
    type: INITIATE_SCORES,
    payload: getAllScores(state)
  };
}