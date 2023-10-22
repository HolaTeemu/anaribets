import axios from "axios";

// Game Service Functions
const getResults = () => {
  return axios.get("/api/games/results");
};

const getUpcomingGames = () => {
  return axios.get("/api/games/upcoming");
};

const getOngoingGames = () => {
  return axios.get("/api/games/ongoing");
};

// this needs to be moved to bets service

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getResults,
  getUpcomingGames,
  getOngoingGames
};
