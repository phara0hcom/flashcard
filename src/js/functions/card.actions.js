import { returnDeck, getCurrentSymbol } from "./card.decks";
import { getCardScore } from "./card.localstorage";

//this returns a new keynr for the deck with the costrains of the settings
// future setting prioritize bad scores
export const chooseNext = state => {
  const symbolNr = chooseNextSyNr(state);
  const symbolObj = getCurrentSymbol(state.deck, symbolNr);
  console.log("chooseNext symbolNr", symbolNr);
  return new Promise((resolve, reject) => {
    getCardScore({ ...state, symbolNr, symbolObj }).then(cardScore => {
      resolve({ symbolNr, cardScore, symbolObj });
    });
  });
};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */

const shuffleArray = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const chooseNextSyNr = state => {
  const deck = returnDeck(state);

  switch (state.deckFunc) {
    case "RANDOM":
      return Math.floor(Math.random() * deck.length);

      break;
    default:
      return Math.floor(Math.random() * deck.length);

      break;
  }
};
