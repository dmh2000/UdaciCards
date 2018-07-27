import {
  RECEIVE_DECKS,
  RECEIVE_DECK
} from '../actions';

function reducer(state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS:
      const decks = JSON.parse(action.payload);
      return {
        ...state,
        decks
      };
      break;
    case RECEIVE_DECK:
      const deck = action.payload;
      return {
        ...state,
        deck
      };
      break;
    default:
      return state;
  }
}

export default reducer;