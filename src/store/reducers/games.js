import {
  SET_RESULTS,
  SET_UPCOMING_GAMES,
} from "../actions/games";

const initialState = {
  upcomingGames: [],
  ongoingGames: [],
  results: [],
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESULTS:
      return {
        ...state,
        results: action.results,
      };
    case SET_UPCOMING_GAMES:
      return {
        ...state,
        upcomingGames: action.upcomingGames,
      };
    default:
      return state;
  }
};

export default gamesReducer;
