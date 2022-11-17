import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { setUsersGroups } from "../store/actions/users";
import usersService from "../services/usersService";

const Leaderboard = (props) => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.users.groups);
  const [groupLeaderboards, setGroupLeaderboards] = useState([]);

  const fetchGroupLeaderboard = (groupId) => {
    const leaderboard = usersService
      .getGroupLeaderboard(groupId)
      .then((result) => {
        return result.data;
      });
    return leaderboard;
  };

  useEffect(() => {
    if (groups.length === 0) {
      usersService.getUsersGroups(props.user).then((res) => {
        dispatch(setUsersGroups(res.data));
      });
    }
  }, [dispatch, groups.length]);

  useEffect(() => {
    if (groups.length > 0) {
      groups.forEach(async (group) => {
        const leaderboard = await fetchGroupLeaderboard(group);
        setGroupLeaderboards((prevLeaderboards) => [
          ...prevLeaderboards,
          leaderboard,
        ]);
      });
    }
  }, [groups.length]);

  return (
    <div>
      {groupLeaderboards.map((leaderboard) => {
        return (
          <>
            <h2>{leaderboard.groupname}</h2>
            <ul>
              {leaderboard.players.map((player) => (
                <li>
                  {player.username} {player.points}
                </li>
              ))}
            </ul>
          </>
        );
      })}
    </div>
  );
};

export default Leaderboard;
