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
  };

  const handleNicknameChange = (event) => {
    event.preventDefault();
    dispatch(setUserName(usernameInput));
    usersService.changeUsername(userId, usernameInput)
    .then((response) => {
      alert("Name changed succesfully!");
    })
    .catch((error) => {
      console.log(error.message);
    });
  };

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <form
      class="w-1/4 mx-auto flex flex-col justify-center items-left"
      onSubmit={handleNicknameChange}
    >
      <h2 class="text-4xl text-center my-12">Hello {username}</h2>
      <div class="flex items-left flex-col">
        <label class="text-2xl mb-1 w-1/3">Username</label>
        <input
          class="text-black text-xl h-10 bg-gray-400 rounded-md w-full p-2 focus:outline outline-teal-500"
          type="text"
          value={usernameInput}
          onChange={usernameInputHandler}
          spellCheck={false}
        />
      </div>
      <p class="text-md w-full italic">
        If you wish to change the username, change it here and click save.
      </p>
      <h3 class="text-2xl mt-14 w-1/3">Groups</h3>
      <ul>
        {groupNames.length !== 0 ? (
          groupNames.map((group) => <li key={group}>{group}</li>)
        ) : (
          <p class="text-xl mt-1">
            You are not in a group yet. Join or create one to start betting!
          </p>
        )}
      </ul>
      <button
        class="mt-14 mx-auto w-1/3 font-semibold text-teal-300 border-2 border-teal-300 rounded-md py-1.5 px-5 hover:bg-teal-700"
        type="submit"
      >
        Save
      </button>
    </form>
  );
};

export default Profile;
