import { returnDeck, getCurrentSymbol } from './card.decks';
import { getCardScore } from './card.localstorage';

//this returns a new keynr for the deck with the costrains of the settings
// future setting prioritize bad scores
export const chooseNext = state => {
    console.log('chooseNext state.symbolNr', state.symbolNr);
    const symbolNr = chooseNextSyNr(state);
    console.log('chooseNext symbolNr', symbolNr);
    const symbolObj = getCurrentSymbol(state, symbolNr);
    console.log('chooseNext symbolObj', symbolObj);

    return new Promise((resolve, reject) => {
        getCardScore({ ...state, symbolNr, symbolObj })
            .then(cardScore => {
                resolve({ symbolNr, cardScore, symbolObj });
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const chooseNextSyNr = state => {
    const deck = returnDeck(state);

    switch (state.settings.deckFunc) {
    case 'RANDOM':
        return Math.floor(Math.random() * deck.length);

    case 'RANDOM_IN_DECK':
        if (state.symbolNr === null || deck.length - 1 === state.symbolNr) {
            return 0;
        }
        return ++state.symbolNr;

    default:
        return Math.floor(Math.random() * deck.length);
    }
};
