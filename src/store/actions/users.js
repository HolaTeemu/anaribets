export const SET_BETS = "SET_BETS";
export const GET_BET = "GET_BET";
export const SET_USERS_GROUPS = "SET_USERS_GROUPS";
export const SET_USERS_GROUP_NAMES = "SET_USERS_GROUP_NAMES";
export const SET_USERS_LEADERBOARDS = "SET_USERS_LEADERBOARDS";
export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const SET_USER_NAME = "SET_USER_NAME";

export const setBets = (bets) => {
    return { type: SET_BETS, bets: bets }
}

export const getBet = (id) => {
    return { type: GET_BET, gameId: id }
}

export const setUsersGroups = (groups) => {
    return { type: SET_USERS_GROUPS, groups: groups }
}

export const setUsersGroupNames = (groupNames) => {
    return { type: SET_USERS_GROUP_NAMES, groupNames: groupNames }
}

export const setUserDetails = (username, id) => {
    return { type: SET_USER_DETAILS, username, id}
}

export const setUserName = (username) => {
    return { type: SET_USER_NAME, username}
}