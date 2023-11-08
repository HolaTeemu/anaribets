import axios from "axios";

// User Service Functions
const checkIfUserExists = (email) => {
  return axios.get(`/api/users/exist/${email}`);
};

const createUser = (username, email) => {
  return axios.post(`/api/users`, { username, email });
};

const changeUsername = (userId, newUsername) => {
  return axios.post(`/api/users/${userId}`, { newUsername });
};

const getUsername = (userId) => {
  return axios.get(`/api/users/${userId}`, { userId });
}

//Bet Service Functions
const saveBets = (bets, userId) => {
  return axios.post(`/api/bets/${userId}`, { bets });
};

const getBets = (userId) => {
  return axios.get(`/api/bets/${userId}`);
};

const getBetAmounts = (userId) => {
  return axios.get(`/api/bets/amounts/${userId}`);
};

const getLastNightsBets = (userId, gameIds) => {
  return axios.post(`/api/bets/results/${userId}`, { gameIds: gameIds });
};

/*
const getSingleGameBetLists = (userId, gameId) => {
  return axios.post(`/api/bets/grouplist/${userId}`, { gameId: gameId });
};
*/

//Group Service Functions
const getGroupLeaderboard = (groupId) => {
  return axios.get(`/api/groups/leaderboard/${groupId}`);
};

const getUsersGroups = (userId) => {
  return axios.get(`/api/groups/${userId}`);
};

const joinGroup = (groupname, password, userId) => {
  return axios.post(`/api/groups/join/${groupname}`, { password, userId });
};

const createGroup = (groupname, password, userId) => {
  return axios.post(`/api/groups/create`, { groupname, password, userId });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  checkIfUserExists,
  createUser,
  saveBets,
  getBets,
  getBetAmounts,
  getLastNightsBets,
  getUsersGroups,
  getGroupLeaderboard,
  joinGroup,
  createGroup,
  changeUsername,
  getUsername,
  //getSingleGameBetLists,
};
