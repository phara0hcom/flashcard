import {
  FLIP,
  ANSWER_QUESTION,
  INITIATE_SCORES,
  UPDATE_SCORES,
  RESET_LAST_ANSWER,
  NEXT_QUESTION
} from "../constants/card.constant";

import { getAllScores } from "../functions/card.localstorage";
import { chooseNext } from "../functions/card.actions";


export const flip = () => {
  return {
    type: FLIP
  };
}

export const  click_answer = ( e ) =>  {
  console.log(e.target.dataset.btnnr);
  return { 
    type: ANSWER_QUESTION,
    value: e.target.value,
    btnNr: e.target.dataset.btnnr
  };
}

export const update_scores = (pastScore, cardScore) => {
  return { 
    type: UPDATE_SCORES,
    pastScore,
    cardScore
  };
}

export const initiate_score = (state) => {
  console.log("INITIATE_SCORES ACTION");
  return { 
    type: INITIATE_SCORES,
    payload: getAllScores(state)
  };
}

export const reset_last_answer = (state) => {

  return { 
    type: RESET_LAST_ANSWER
  };

}

export const next_question = (state) => {
  //console.log("chooseNext", chooseNext(state) );
  return { 
    type: NEXT_QUESTION,
    payload: chooseNext(state)
  };

}

