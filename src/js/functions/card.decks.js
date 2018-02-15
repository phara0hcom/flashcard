import decks from "../decks";


export const returnDeck = ( state ) => {
    console.log( decks );
    return decks[state.deck];
}

export const getCurrentSymbol = ( state ) => {
    return decks[state.deck][state.symbolNr];
}