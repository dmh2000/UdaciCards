import {AsyncStorage} from 'react-native';

export const DECK_STORAGE_KEY = 'UdaciCards:desks';

const dummy = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};

export function getDecks() {
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
      return dummy;
    }
  })
  .then( (results) => {
    return results;
  })
  .catch( (error) => {
    return null;
  });
}

export function getDeck(id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then( (results) => {
    return dummy[id];
  })
  .catch( (error) => {
    return null;
  });
}

export function saveDeckTitle(title) {

}

export function addCardToDeck(title,card) {

}

/**
 * create unique id for deck
 */
export function createId() {
  const t = Date.now().toString();
  const r = Math.random().toString(36).substr(2,5);
  return `${r}-${t}`;
}
