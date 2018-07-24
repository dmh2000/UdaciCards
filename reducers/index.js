import {RECEIVE_DECKS} from '../actions';

function reducer(state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS:
      const decks = JSON.parse(action.payload);
      return {
        ...state,
        decks
      };
      break;
    default:
      return state;
  }
}

export default reducer;