import { returnDeck, getCurrentSymbol } from "./card.decks";
import { getCardScore } from "./card.localstorage";

//this returns a new keynr for the deck with the costrains of the settings
// future setting prioritize bad scores
export const chooseNext = (state) => {
    const symbolNr = chooseNextSyNr(state);
    const symbolObj = getCurrentSymbol(state.deck, symbolNr);
    console.log("chooseNext symbolNr", symbolNr);
 return new Promise((resolve, reject) => {
   getCardScore({ ...state, symbolNr, symbolObj })
   .then(cardScore => {
     console.log("Promise cardScore WTF");

     resolve({ symbolNr, cardScore, symbolObj });
   });
 });
    


} 

const chooseNextSyNr = (state) => {
    const deck = returnDeck(state);

    switch (state.deckFunc) {
        case "RANDOM":
            return Math.floor(Math.random() * deck.length);

            break;
        default:

            return Math.floor(Math.random() * deck.length);

            break;
    }
}
