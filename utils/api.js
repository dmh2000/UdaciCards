import {AsyncStorage} from 'react-native';

export const DECK_STORAGE_KEY = 'UdaciCards:desks';

export function _getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then( (results) => {
    // no decks yet
    if (results === null) {
      return AsyncStorage.setItem(DECK_STORAGE_KEY,JSON.stringify({}))
      .then( () => {
        return {};
      });
    }
    else {
      return results;
    }
  });
}

export function _getDeck(id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then( (results) => {
    return dummy[id];
  })
  .catch( (error) => {
    return null;
  });
}

export function _saveDeckTitle(title) {

}

export function _addCardToDeck(title,card) {

}

/**
 * create unique id for deck
 */
export function createId() {
  const t = Date.now().toString();
  const r = Math.random().toString(36).substr(2,5);
  return `${r}-${t}`;
}
