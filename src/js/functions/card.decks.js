import decks from '../decks';

export const returnDeck = state => {
    let customDeck = [];
    const decksNames = state.settings.decks;
    decksNames.map((decksName) => {
        customDeck = customDeck.concat(decks[decksName]);
    });
    return customDeck;
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

const shuffleArrayInit = DeckLength => {
    let deckNrs = [];
    for (let i = DeckLength - 1; i >= 0; i--) {
        deckNrs = deckNrs.concat([i]);
    }
    console.log('shuffleArray >> deckNrs', deckNrs);

    return shuffleArray(deckNrs);
};

export const getCustomDeckObj = state => {
    switch (state.settings.deckFunc) {
    case 'RANDOM':
        return [];

    case 'RANDOM_IN_DECK': {
        const concatDeck = returnDeck(state);
        return shuffleArrayInit(concatDeck.length);
    }
    default:
        return [];
    }
};

export const getCurrentSymbol = (state, symbolNr) => {
    const concatDecks = returnDeck(state);

    switch (state.settings.deckFunc) {
        case 'RANDOM':
            return concatDecks[symbolNr];

        case 'RANDOM_IN_DECK':
            // console.log("getCurrentSymbol symbolNr", symbolNr);
            // console.log(
            //   "getCurrentSymbol state.customDeck[symbolNr]",
            //   state.customDeck[symbolNr]
            // );
            return concatDecks[state.customDeck[symbolNr]];

        default:
            return [];
    }
};
