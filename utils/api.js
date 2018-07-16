import {AsyncStorage} from 'react-native';

export function getDecks() {

}

export function getDeck(id) {

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
