import { SET_BETS, GET_BET } from "../actions/bets";

const initialState = {
  betsMade: [],
};

const betsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BETS:
      return {
        ...state,
        betsMade: action.bets,
      };
    case GET_BET:
      state.betsMade.find((bet) => {
        return bet.game === action.gameId;
      });
    default:
      return state;
  }
};

export default betsReducer;
