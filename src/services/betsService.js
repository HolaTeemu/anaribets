import axios from "axios";

const saveBets = (bets, username) => {
  return axios.post(`/api/users/bets/${username.toLowerCase()}`, { bets });
};

const getBets = (username) => {
  return axios.get(`/api/users/bets/${username.toLowerCase()}`);
};

// const getUpcomingGames = (startDate) => {
//   return axios.get(
//     `${baseUrl}/scores?startDate=${startDate}&endDate=${startDate}`
//   );
// };

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  saveBets,
  getBets,
};
