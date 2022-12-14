import axios from "axios";

const getResults = () => {
  return axios.get("/api/results");
};

const getUpcomingGames = () => {
  return axios.get("/api/upcoming");
};

const getOngoingGames = () => {
  return axios.get("/api/ongoing");
};

const getLastNightsBets = (userId, gameIds) => {
  return axios.post(`/api/results/${userId}`, { gameIds: gameIds });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getResults,
  getUpcomingGames,
  getOngoingGames,
  getLastNightsBets
};
