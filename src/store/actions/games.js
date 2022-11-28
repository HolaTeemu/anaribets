export const GET_RESULTS = "GET_RESULTS";
export const SET_RESULTS = "SET_RESULTS";
export const SET_UPCOMING_GAMES = "SET_UPCOMING_GAMES";
export const SET_ONGOING_GAMES = "SET_ONGOING_GAMES";
export const SET_LAST_NIGHTS_BETS = "SET_LAST_NIGHTS_BETS";

export const setResults = (fetchedResults) => {
    return { type: SET_RESULTS, results: fetchedResults }
}

export const setUpcomingGames = (fetchedGames) => {
    return { type: SET_UPCOMING_GAMES, upcomingGames: fetchedGames }
}

export const setOngoingGames = (fetchedGames) => {
    return { type: SET_ONGOING_GAMES, ongoingGames: fetchedGames }
}

export const setLastNightsBets = (bets) => {
    return { type: SET_LAST_NIGHTS_BETS, lastNightsBets: bets }
}
