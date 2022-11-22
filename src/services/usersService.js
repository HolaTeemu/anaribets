import axios from "axios";

const checkIfUserExists = (email) => {
  return axios.get(`/api/users/exist/${email}`);
}

const createUser = (username, email) => {
  return axios.post(`/api/users`, {username, email});
}

const saveBets = (bets, userId) => {
  return axios.post(`/api/users/bets/${userId}`, { bets });
};

const getBets = (userId) => {
  return axios.get(`/api/users/bets/${userId}`);
};

const getUsersGroups = (userId) => {
  return axios.get(`/api/users/${userId}`);
}

const getGroupLeaderboard = (groupId) => {
  return axios.get(`/api/groups/${groupId}`);
}

const joinGroup = (groupname, password, userId) => {
  return axios.post(`/api/groups/join/${groupname}`, {password, userId})
}

const createGroup = (groupname, password, userId) => {
  return axios.post(`/api/groups/create`, {groupname, password, userId})
}

const changeUsername = (userId, newUsername) => {
  return axios.post(`/api/users/${userId}`, {newUsername})
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  checkIfUserExists,
  createUser,
  saveBets,
  getBets,
  getUsersGroups,
  getGroupLeaderboard,
  joinGroup,
  createGroup,
  changeUsername
};
