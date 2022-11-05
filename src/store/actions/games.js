export const GET_RESULTS = "GET_RESULTS";
export const SET_RESULTS = "SET_RESULTS";
export const SET_UPCOMING_GAMES = "SET_UPCOMING_GAMES";

export const setResults = (fetchedResults) => {
    return { type: SET_RESULTS, results: fetchedResults }
}

export const setUpcomingGames = (fetchedGames) => {
    return { type: SET_UPCOMING_GAMES, upcomingGames: fetchedGames }
}
