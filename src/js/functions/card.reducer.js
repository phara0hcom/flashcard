import { getCurrentSymbol } from "./card.decks";
import { saveKey, updateCardScore } from "./card.localstorage";

export const FLIPcard = (current, state) => {
  switch (current) {
    case "UP":
      return { ...state, face: "DOWN" };
    default:
      return { ...state, face: "UP" };
  }
};

const calScore = ( score, corrAnswerd ) => {
     if( corrAnswerd ) {
        return {
            ...score,
            questions_correct: score.questions_correct + 1
        }
    } else {
        return {
            ...score,
            questions_failed: score.questions_failed + 1
        }
    }
}

export const checkAnswer = (state, answer) => {
    const correct_ans = state.symbolObj.roman;
    const corrAnswerd = correct_ans === answer;
    const face = corrAnswerd ? "DOWN" : "UP";

    //updateCardScore(state, corrAnswerd);
    saveKey(state.symbolObj.index, calScore(state.cardScore, corrAnswerd))
      .then(value => {
        console.log("checkAnswer >> saveKey = " + index, value);
      })
      .catch(err => {
        console.log("checkAnswer >> saveKey = " + index, err);
      });

    saveKey("pastScore", calScore( state.pastScore,  corrAnswerd ) )
    .then(value => {
        console.log("checkAnswer >> saveKey = pastScore", value);
    })
    .catch(err => {
        console.log("checkAnswer >> saveKey = pastScore", err);
    });

    return {
        ...state,
        face,
        score: calScore( state.score,  corrAnswerd ),
        cardScore : calScore( state.cardScore,  corrAnswerd ),
        pastScore : calScore( state.pastScore,  corrAnswerd )
    }; 
}
