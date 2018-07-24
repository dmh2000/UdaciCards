import {_getDecks,_getDeck,_saveTitle,_addCard} from '../utils/api';

export const LOAD_DECKS = 'LOAD_DECKS';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const GET_DECK  = 'GET_DECK';
export const ADD_CARD = 'ADD_QUESTION';
export const SAVE_TITLE = 'SAVE_TITLE';

export function receiveDecks(decks) {

  return {
    type: RECEIVE_DECKS,
    payload: decks
  };
}

export function loadDecks() {
  return (dispatch) => {
    _getDecks()
    .then( (decks) => {
      dispatch(receiveDecks(decks));
    });
  };
}

export function getDeck(deck) {
  return {
    type: GET_DECK,
    payload: deck
  };
}

export function addCard(card) {
  return {
    type: ADD_CARD,
    payload: card
  };
}

export function saveTitle(title) {
  return {
    type: SAVE_TITLE,
    payload: title
  };
}