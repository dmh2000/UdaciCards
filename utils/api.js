import {AsyncStorage} from 'react-native';

export const DECK_STORAGE_KEY = 'UdaciCards:decks';

/**
 * request to load all decks
 */
export function _getDecks() {
  console.log('_getDecks');
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then( (results) => {
    console.log('gotDecks',results);
    return results;
  })
  .catch( (error) => {
    console.error(error);
    return {};
  });
}

/**
 * request to get a specific deck
 * @param {string} id 
 */
export function _getDeck(id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then( (results) => {
    console.log(results);
    return results[id];
  })
  .catch( (error) => {
    return null;
  });
}

export function _saveDeckTitle(title) {
  console.log('_saveDeckTitle');
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then( (results) => {
    let decks = JSON.parse(results);
    console.log(decks,title);
    decks = {
      ...decks,
      // add the new entry with just a title, 0 questions
      [title]: {
        title,
        questions: []
      }
    };
    return AsyncStorage.setItem(DECK_STORAGE_KEY,JSON.stringify(decks));
  });
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
