import { FLIP } from "../constants/card.constant";

const initialState = {
  face: "UP"
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
      return state;
  }
};

export default card;