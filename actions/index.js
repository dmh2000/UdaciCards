import {_setInitialData,_getDecks,_saveDeckTitle, _addCardToDeck} from '../utils/api';

export const LOAD_DECKS = 'LOAD_DECKS';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
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
 * get all decks from storage then dispatch
 * receiveDecks action creator
 */
export function loadDecks() {
  return (dispatch) => {
    _getDecks()
    .then( (decks) => {
      dispatch(receiveDecks(decks));
    });
  };
}

/**
 * 
 * @param {object} card 
 */
export function addCardToDeck(id,question,answer) {
  return (dispatch) => {
    _addCardToDeck(id,question,answer)
    .then( () => {
      _getDecks()
      .then( (decks) => {
        dispatch(receiveDecks(decks));
      });
    });
  };
}

/**
 * 
 * @param {string} title 
 */
export function saveDeckTitle(title) {
  // save title (creates new quiz) then reread the deck object
  return (dispatch) => {
    return _saveDeckTitle(title)
    .then( () => {
      _getDecks()
      .then( (decks) => {
        dispatch(receiveDecks(decks));
      });
    });
  };
}