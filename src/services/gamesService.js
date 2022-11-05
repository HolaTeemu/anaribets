import axios from "axios";

const baseUrl = "https://nhl-score-api.herokuapp.com/api";

const getResults = () => {
    return axios.get(`${baseUrl}/scores/latest`);
}

const getUpcomingGames = (startDate) => {
    return axios.get(`${baseUrl}/scores?startDate=${startDate}&endDate=${startDate}`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getResults,
    getUpcomingGames
}