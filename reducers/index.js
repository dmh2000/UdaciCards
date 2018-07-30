import {
  RECEIVE_DECKS,
  RECEIVE_DECK,
  ADD_CARD
} from '../actions';

function reducer(state = {}, action) {
  let deck;
  switch(action.type) {
    case RECEIVE_DECKS:
      const decks = JSON.parse(action.payload);
      return {
        ...state,
        decks
      };
    default:
      return state;
  }
}

export default reducer;