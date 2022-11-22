import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import usersService from "../services/usersService";
import { setUserName } from "../store/actions/users";
import ReactGA from "react-ga";

const Profile = () => {
  const dispatch = useDispatch();
  const groupNames = useSelector((state) => state.users.groupNames);
  const username = useSelector((state) => state.users.username);
  const userId = useSelector((state) => state.users.userId);
  const [usernameInput, setUsernameInput] = useState(username);

  const usernameInputHandler = (event) => {
    setUsernameInput(event.target.value);
  }

  const handleNicknameChange = (event) => {
    event.preventDefault()
    dispatch(setUserName(usernameInput));
    usersService.changeUsername(userId, usernameInput)
    .catch((error) => {
      console.log(error.message);
    })
  }

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, [])

  return (
    <form onSubmit={handleNicknameChange}>
      <h2>Hello {username}</h2>
      <label>Username</label>
      <input type="text" value={usernameInput} onChange={usernameInputHandler} />
      <p>If you wish to change the username, change it here and click save. Name will be lowercased.</p>
      <h3>Groups</h3>
      <ul>
        {groupNames.length !== 0 ? (
          groupNames.map((group) => <li>{group}</li>)
        ) : (
          <p>
            You are not in a group yet. Join or create one to start betting!
          </p>
        )}
      </ul>
      <button type="submit">Save</button>
    </form>
  );
};

export default Profile;
