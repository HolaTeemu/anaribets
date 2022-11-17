import axios from "axios";

const saveBets = (bets, username) => {
  return axios.post(`/api/users/bets/${username.toLowerCase()}`, { bets });
};

const getBets = (username) => {
  return axios.get(`/api/users/bets/${username.toLowerCase()}`);
};

const getUsersGroups = (username) => {
  return axios.get(`/api/users/${username.toLowerCase()}`);
}

const getGroupLeaderboard = (groupId) => {
  return axios.get(`/api/groups/${groupId}`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  saveBets,
  getBets,
  getUsersGroups,
  getGroupLeaderboard
};
