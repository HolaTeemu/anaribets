import {
  SET_LAST_NIGHTS_BETS,
  SET_ONGOING_GAMES,
  SET_RESULTS,
  SET_UPCOMING_GAMES,
} from "../actions/games";

const initialState = {
  upcomingGames: [],
  ongoingGames: [],
  results: [],
  lastNightsBets: [],
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
    case SET_ONGOING_GAMES:
      return {
        ...state,
        ongoingGames: action.ongoingGames,
      };
    case SET_LAST_NIGHTS_BETS:
      return {
        ...state,
        lastNightsBets: action.lastNightsBets,
      };
    default:
      return state;
  }
};

export default gamesReducer;
