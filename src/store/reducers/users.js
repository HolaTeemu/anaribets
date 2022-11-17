import { SET_BETS, GET_BET, SET_USERS_GROUPS, GET_USERS_GROUPS } from "../actions/users";

const initialState = {
  betsMade: [],
  groups: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BETS:
      return {
        ...state,
        betsMade: state.betsMade.concat(action.bets),
      };
    case GET_BET:
      state.betsMade.find((bet) => {
        return bet.game === action.gameId;
      });
    case SET_USERS_GROUPS:
      return {
        ...state,
        groups: action.groups,
      }
    case GET_USERS_GROUPS:
      return state.groups;
    default:
      return state;
  }
};

export default usersReducer;
