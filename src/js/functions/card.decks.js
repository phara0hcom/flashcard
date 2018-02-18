import decks from "../decks";


export const returnDeck = ( state ) => {

    return decks[state.deck];
}

export const getCurrentSymbol = ( deck , symbolNr ) => {
    return decks[deck][symbolNr];
};