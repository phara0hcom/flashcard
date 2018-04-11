import {
    FLIP,
    ANSWER_QUESTION,
    INITIATE_APP_PENDING,
    INITIATE_APP_FULFILLED,
    INITIATE_APP_REJECTED,
    UPDATE_SCORES,
    RESET_LAST_ANSWER,
    NEXT_QUESTION_PENDING,
    NEXT_QUESTION_FULFILLED,
    NEXT_QUESTION_REJECTED
} from '../constants/card.constant';

import { FLIPcard, checkAnswer, createAnswer } from '../functions/card.reducer';
// import { getPastScore, getCardScore } from '../functions/card.localstorage';
// import { getCurrentSymbol } from '../functions/card.decks';
// import { basicHiragana } from '../decks/hiragana';

const initialState = {
    face: 'UP',
    cardState: 'LOADING',
    fetchingSavedata: false,
    fetchSavedataError: false,
    symbolNr: null,
    last_answer: null,
    answers: [],
    answered: [],
    customDeck: [],
    score: {
        questions_failed: 0,
        questions_correct: 0
    },
    pastScore: {
        questions_failed: 0,
        questions_correct: 0
    },
    cardScore: {
        questions_failed: 0,
        questions_correct: 0
    },
    settings: {
        decks: ['basicKatakana'],
        deckFunc: 'RANDOM_IN_DECK'
    }
};

const card = (state = initialState, action) => {
    switch (action.type) {
    case FLIP:
        return FLIPcard(state.face, state);

    case ANSWER_QUESTION:
        return checkAnswer(state, action);

        //might not need this
        case UPDATE_SCORES:
            console.log('UPDATED SCORES', action);
            return {
                ...state,
                pastScore: action.pastScore,
                cardScore: action.cardScore
            };

        case INITIATE_APP_PENDING:
            console.log('INITIATE_APP_PENDING');
            return {
                ...state,
                cardState: 'LOADING',
                fetchingSavedata: true
            };

        case INITIATE_APP_FULFILLED:
            console.log('INITIATE_APP_FULFILLED');
            console.log(
                'INITIATE_APP_FULFILLED >> action.payload',
                action.payload
            );
            return {
                ...state,
                cardState: 'DONE',
                fetchingSavedata: false,
                symbolNr: action.payload.symbolNr,
                symbolObj: action.payload.symbolObj,
                customDeck: action.payload.customDeck,
                answers: createAnswer(action.payload.symbolObj),
                pastScore: action.payload.pastScore,
                cardScore: action.payload.cardScore,
                settings: action.payload.settings
            };

        case INITIATE_APP_REJECTED:
            console.log('INITIATE_APP_REJECTED');
            return {
                ...state,
                cardState: 'ERROR',
                fetchingSavedata: false,
                fetchSavedataError: true
            };

        case RESET_LAST_ANSWER:
            return {
                ...state,
                last_answer: null
            };

        case NEXT_QUESTION_PENDING:
            console.log('NEXT_QUESTION_PENDING');
            return {
                ...state,
                face: 'UP',
                fetchingScore: true
            };

        case NEXT_QUESTION_REJECTED:
            console.log('NEXT_QUESTION_REJECTED');
            return {
                ...state,
                fetchingScore: false,
                fetchSavedataError: true
            };

        case NEXT_QUESTION_FULFILLED:
            console.log('NEXT_QUESTION_FULFILLED');
            console.log('action.payload', action.payload);
            return {
                ...state,
                fetchingScore: false,
                answered: [],
                answers: createAnswer(action.payload.symbolObj),
                symbolObj: action.payload.symbolObj,
                cardScore: action.payload.cardScore,
                symbolNr: action.payload.symbolNr
            };

        default:
            return {
                ...state
            };
    }
};

export default card;
