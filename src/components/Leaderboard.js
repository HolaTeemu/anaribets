/* eslint-disable jsx-a11y/alt-text */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactGA from "react-ga";

import { setUsersGroupNames, setUsersGroups } from "../store/actions/users";
import usersService from "../services/usersService";
import showPasswordImg from "../assets/eye-teal.svg";
import hidePasswordImg from "../assets/eye-off-teal-outline.svg";

const Leaderboard = (props) => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.users.groups);
  const userId = useSelector((state) => state.users.userId);
  const [groupLeaderboards, setGroupLeaderboards] = useState([]);
  const [groupNameInput, setGroupNameInput] = useState("");
  const [groupPasswordInput, setGroupPasswordInput] = useState("");
  const [groupNames, setGroupNames] = useState([]);
  const [passwordHidden, setPasswordHidden] = useState(true);

  const fetchGroupLeaderboard = (groupId) => {
    const leaderboard = usersService
      .getGroupLeaderboard(groupId)
      .then((result) => {
        return result.data;
      });
    return leaderboard;
  };

  useEffect(() => {
    setGroupLeaderboards([]);
    if (groups.length === 0 && userId) {
      usersService
        .getUsersGroups(userId)
        .then((res) => {
          dispatch(setUsersGroups(res.data));
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    if (groups.length > 0) {
      groups.forEach(async (group) => {
        const leaderboard = await fetchGroupLeaderboard(group);
        setGroupLeaderboards((prevLeaderboards) => [
          ...prevLeaderboards,
          leaderboard,
        ]);
        setGroupNames((prevGroupNames) => [
          ...prevGroupNames,
          leaderboard.groupname,
        ]);
      });
    }
  }, [dispatch, groups.length, userId]);

  useEffect(() => {
    if (groupNames.length > 0) {
      dispatch(setUsersGroupNames(groupNames));
    }
  }, [dispatch, groupNames]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  const showPasswordHandler = () => {
    setPasswordHidden(!passwordHidden);
  };

  const handleGroupNameInput = (event) => {
    setGroupNameInput(event.target.value);
  };

  const handleGroupPasswordInput = (event) => {
    setGroupPasswordInput(event.target.value);
  };

  const joinGroup = () => {
    if (groupNames.includes(groupNameInput)) {
      alert(`You already belong to a group called ${groupNameInput}`);
    } else {
      usersService
        .joinGroup(groupNameInput, groupPasswordInput, userId)
        .then((result) => {
          dispatch(setUsersGroups([...groups, result.data.groupId]));
        })
        .catch((error) => {
          alert(
            `Group named ${groupNameInput} not found or the password was incorrect. Try again`
          );
        });
    }
  };

  const createGroup = () => {
    if (groupNames.includes(groupNameInput)) {
      alert(`You already belong to a group called ${groupNameInput}`);
    } else {
      usersService
        .createGroup(groupNameInput, groupPasswordInput, userId)
        .then((result) => {
          console.log(result);
          dispatch(setUsersGroups([...groups, result.data.groupId]));
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div>
      <h2 class="text-4xl text-center my-12">Your leaderboards</h2>
      {groups.length === 0 ? (
        <h3 class="text-2xl text-center my-16">
          You are not in any group yet.<br/>
          Create or join one to start betting.
        </h3>
      ) : (
        groupLeaderboards.map((leaderboard) => {
          const sortedLeaderboard = leaderboard.players.sort(
            (a, b) => b.points - a.points
          );
          return (
            <div class="flex mx-auto text-center flex-col justify-center items-center w-1/2 mb-20">
              <h2 class="w-1/2 text-4xl font-normal text-left">
                {leaderboard.groupname}
              </h2>
              <table class="w-1/2 text-center">
                <thead class="text-2xl bg-gray-600 rounded">
                  <tr>
                    <th class="w-1/4 font-light">Position</th>
                    <th class="w-1/4 font-light">Nickname</th>
                    <th class="w-1/4 font-light">Points</th>
                  </tr>
                </thead>
                {sortedLeaderboard.map((player, i) => (
                  <tbody class="text-xl">
                    <tr>
                      <td>{i + 1}</td>
                      <td>{player.username}</td>
                      <td>{player.points}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          );
        })
      )}
      <div class="flex mx-auto text-center flex-col justify-center items-left w-1/4 pb-10">
        <h2 class="text-4xl text-left pt-12 mb-6">Join/Create a group</h2>
        <label class="text-xl text-left">Group name</label>
        <input
          type="text"
          onChange={handleGroupNameInput}
          value={groupNameInput}
          class="text-black text-xl h-10 bg-gray-400 rounded-md w-11/12 p-2 focus:outline outline-teal-500"
        />
        <label class="text-xl text-left">Group password</label>
        <div class="flex align-middle">
          <input
            type={passwordHidden ? "password" : "text"}
            onChange={handleGroupPasswordInput}
            value={groupPasswordInput}
            class="text-black text-xl h-10 bg-gray-400 rounded-md w-11/12 p-2 focus:outline outline-teal-500"
          />
          <img
            class="w-1/12 h-10 cursor-pointer"
            onClick={showPasswordHandler}
            src={passwordHidden ? showPasswordImg : hidePasswordImg}
          />
        </div>
        <button class="mt-6 mx-auto w-1/2 font-semibold text-teal-300 border-2 border-teal-300 rounded-md py-1.5 px-5 hover:bg-teal-700" onClick={() => joinGroup(groupNameInput, groupPasswordInput)}>
          Join new Group
        </button>
        <button
          class="mt-4 mx-auto w-1/2 font-semibold text-teal-300 py-1.5 px-5 hover:bg-teal-700 border-0 rounded-md"
          onClick={() => createGroup(groupNameInput, groupPasswordInput)}
        >
          Create new group
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
