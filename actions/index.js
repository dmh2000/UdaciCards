import {_setInitialData,_getDecks,_getDeck,_saveDeckTitle,_addCard} from '../utils/api';

export const LOAD_DECKS = 'LOAD_DECKS';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const RECEIVE_DECK  = 'RECEIVE_DECK';
export const ADD_CARD = 'ADD_QUESTION';
export const SAVE_TITLE = 'SAVE_TITLE';

/**
 * AsyncStorage is source of truth
 * all operations modify the async storage then return
 * the new truth data from storage
 * REDUX STATE
 * {
 *  decks: all decks,
 *  deck:  current deck
 * }
 */



/**
 * dispatch decks reducer
 */
export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    payload: decks
  };
}

/**
 * dispatch deck reducer
 */
export function receiveDeck(deck) {

  return {
    type: RECEIVE_DECK,
    payload: deck
  };
}


/**
 * get all decks from storage then dispatch
 * receiveDecks action creator
 */
export function loadDecks() {
  console.log('load decks');
  return (dispatch) => {
    console.log('getDecks');
    _getDecks()
    .then( (decks) => {
      console.log('receive decks');
      dispatch(receiveDecks(decks));
    });
  };
}

/**
 * get all the decks, extract the one with the specified id
 * and dispatch receiveDeck action creator
 * @param {string} id 
 */
export function getDeck(id) {
  return (dispatch) => {
    console.log('getDeck',id);
    _getDecks()
    .then( (decks) => {
      console.log(decks);
      dispatch(receiveDeck(decks[id]));
    });
  };
}


/**
 * 
 * @param {object} card 
 */
export function addCardToDeck(card) {
  return {
    type: ADD_CARD,
    payload: card
  };
}

/**
 * 
 * @param {string} title 
 */
export function saveDeckTitle(title) {
  // save title (creates new quiz) then reread the deck object
  return (dispatch) => {
    console.log('save title',title);
    return _saveDeckTitle(title)
    .then( () => {
      _getDecks()
      .then( (decks) => {
        console.log('reload decks');
        dispatch(receiveDecks(decks));
      });
    });
  };
}