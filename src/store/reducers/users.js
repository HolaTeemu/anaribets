import {
  SET_BETS,
  GET_BET,
  SET_USERS_GROUPS,
  SET_USERS_GROUP_NAMES,
  SET_USER_DETAILS,
  SET_USER_NAME
} from "../actions/users";

const initialState = {
  betsMade: [],
  groups: [],
  groupNames: [],
  username: "",
  userId: "",
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
      };
    case SET_USERS_GROUP_NAMES:
      return {
        ...state,
        groupNames: action.groupNames,
      };
    case SET_USER_DETAILS:
      return {
        ...state,
        username: action.username,
        userId: action.id,
      };
    case SET_USER_NAME:
      return {
        ...state,
        username: action.username,
      };
    default:
      return state;
  }
};

export default usersReducer;
