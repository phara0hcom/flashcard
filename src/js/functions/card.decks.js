import decks from "../decks";


export const returnDeck = () => {

}
export const getCurrentSymbol = ( state ) => {
    console.log( decks[state.deck][state.symbolNr]);
    return decks[state.deck][state.symbolNr];
}