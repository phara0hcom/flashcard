import { FLIP } from "../constants/card.constant";
import { ANSWER_QUESTION } from "../constants/card.constant";


export function flip() {
  return {
    type: FLIP
  };
}

export function click_answer( e ) {
  console.log("click_answer ACTION");
  console.log( e.target.value );
  return { 
    type: ANSWER_QUESTION,
    value: e.target.value
  };
}