import decks from "../decks";

export const returnDeck = state => {
  return decks[state.settings.deck];
};

export const getCurrentSymbol = (state, symbolNr) => {
  switch (state.settings.deckFunc) {
    case "RANDOM":
      return decks[state.settings.deck][symbolNr];
      break;

    case "RANDOM_IN_DECK":
      if (symbolNr === 0) {
        //create custom Deck
      }

    default:
      return decks[state.settings.deck][symbolNr];
      break;
  }
};
