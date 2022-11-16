export const SET_BETS = "SET_BETS";
export const GET_BET = "GET_BET";

export const setBets = (bets) => {
    console.log(bets);
    return { type: SET_BETS, bets: bets }
}

export const getBet = (id) => {
    return { type: GET_BET, gameId: id }
}

