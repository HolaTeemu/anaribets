export const SET_BETS = "SET_BETS";
export const GET_BET = "GET_BET";
export const SET_USERS_GROUPS = "SET_USERS_GROUPS";
export const GET_USERS_GROUPS = "GET_USERS_GROUPS";

export const setBets = (bets) => {
    console.log(bets);
    return { type: SET_BETS, bets: bets }
}

export const getBet = (id) => {
    return { type: GET_BET, gameId: id }
}

export const setUsersGroups = (groups) => {
    return { type: SET_USERS_GROUPS, groups: groups }
}

export const getUsersGroups = () => {
    return { type: GET_USERS_GROUPS }
}