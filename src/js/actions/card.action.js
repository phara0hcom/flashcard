import {
  FLIP,
  ANSWER_QUESTION,
  INITIATE_APP,
  UPDATE_SCORES,
  RESET_LAST_ANSWER,
  NEXT_QUESTION
} from "../constants/card.constant";

import { getScoresSettings } from "../functions/card.reducer";
import { chooseNext } from "../functions/card.actions";

export const flip = () => {
  return {
    type: FLIP
  };
};

export const click_answer = e => {
  console.log(e.target.dataset.btnnr);
  return {
    type: ANSWER_QUESTION,
    value: e.target.value,
    btnNr: e.target.dataset.btnnr
  };
};

export const update_scores = (pastScore, cardScore) => {
  return {
    type: UPDATE_SCORES,
    pastScore,
    cardScore
  };
};

export const initiate_app = state => {
  console.log("INITIATE_APP ACTION");
  return {
    type: INITIATE_APP,
    payload: getScoresSettings(state)
  };
};

export const reset_last_answer = state => {
  return {
    type: RESET_LAST_ANSWER
  };
};

export const next_question = state => {
  //console.log("chooseNext", chooseNext(state) );
  return {
    type: NEXT_QUESTION,
    payload: chooseNext(state)
  };
};
