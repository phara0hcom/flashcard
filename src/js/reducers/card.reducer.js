import { FLIP } from "../constants/card.constant";
import { basicHiragana } from "../decks/hiragana";

const initialState = {
  face: "UP",
  symbolNr: 0
};

const FLIPcard = ( current ) => {
    switch (current) {
      case "UP":
        return "DOWN";
      default:
        return "UP";
    }
}

const card = (state = initialState, action) => {
  switch (action.type) {
    case FLIP:
      return { ...state, face: FLIPcard ( state.face ) };

    default:
      return { 
        ...state,
        symbolObj: basicHiragana[state.symbolNr]
      }
  }
};

export default card;