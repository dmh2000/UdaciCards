import {AsyncStorage} from 'react-native';

export const DECK_STORAGE_KEY = 'UdaciCards:decks';

const reset = false;
/**
 * request to load all decks
 */
export function _getDecks() {
  if (reset) {
    return AsyncStorage.setItem(DECK_STORAGE_KEY,JSON.stringify({}));
  }

  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then( (results) => {
    console.log('results',results);
    if (!results) {
      AsyncStorage.setItem(DECK_STORAGE_KEY,JSON.stringify({}))
      .then( () => {
        return {};
      });
    }
    else {
      return results;
    }
  })
  .catch( (error) => {
    console.error(error);
  });
}

export function _saveDeckTitle(title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then( (results) => {
    let decks = JSON.parse(results);
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

export function _addCardToDeck(title,question,answer) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then( (results) => {
    let decks = JSON.parse(results);
    const questions = decks[title].questions;
    questions.push({question,answer});
    decks = {
      ...decks,
      // update the deck with the new questions list
      [title]: {
        title,
        questions:questions
      }
    };
    return AsyncStorage.setItem(DECK_STORAGE_KEY,JSON.stringify(decks));
  });
}
