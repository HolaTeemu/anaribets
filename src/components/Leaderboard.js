import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactGA from "react-ga";

import { setUsersGroupNames, setUsersGroups } from "../store/actions/users";
import usersService from "../services/usersService";

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
  }, [dispatch, groups, groups.length, userId]);

  useEffect(() => {
    if (groupNames.length > 0) {
      dispatch(setUsersGroupNames(groupNames));
    }
  }, [dispatch, groupNames]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, [])

  const showPasswordHandler = () => {
      setPasswordHidden(!passwordHidden);
  }

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
          alert(`Group named ${groupNameInput} not found or the password was incorrect. Try again`);
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
      <h2>Your leaderboards</h2>
      {groups.length === 0 ? (
        <h3>
          You are not in any group yet. Create or join one to start betting.
        </h3>
      ) : (
        groupLeaderboards.map((leaderboard) => {
          const sortedLeaderboard = leaderboard.players.sort(
            (a, b) => b.points - a.points
          );
          return (
            <>
              <h2>{leaderboard.groupname}</h2>
              <table>
                <tr>
                  <th>Nickname</th>
                  <th>Points</th>
                </tr>
                {sortedLeaderboard.map((player) => (
                  <tr>
                    <td>{player.username}</td>
                    <td>{player.points}</td>
                  </tr>
                ))}
              </table>
            </>
          );
        })
      )}
      <label>Group name</label>
      <input
        type="text"
        onChange={handleGroupNameInput}
        value={groupNameInput}
      />
      <label>Group password</label>
      <input
        type={passwordHidden ? "password" : "text"}
        onChange={handleGroupPasswordInput}
        value={groupPasswordInput}
      />
      <button onClick={showPasswordHandler}>Show password button</button>
      <button onClick={() => createGroup(groupNameInput, groupPasswordInput)}>
        Create new group
      </button>
      <button onClick={() => joinGroup(groupNameInput, groupPasswordInput)}>
        Join new Group
      </button>
    </div>
  );
};

export default Leaderboard;
