import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();

  return (
    <header class="bg-gray-600 font-poppins flex w-full max-w-full h-28 items-center">
      {/* {!user && (
        <NavLink to="/" class="mx-auto">
          <h1 class="inline-block text-4xl w-full text-center hover:text-teal-300 hover:drop-shadow-2xl">BetNHLFree</h1>
        </NavLink>
      )} */}
      <div  class={`mx-auto ${user ? "w-1/5" : ""}`}>
        <NavLink to="/">
          <h1 class="inline-block text-4xl mx-auto text-center hover:text-teal-300 hover:drop-shadow-2xl w-full">
            BetNHLFree
          </h1>
        </NavLink>
      </div>
      {user && (
        <nav class="text-2xl font-thin flex justify-evenly items-center w-3/5 m-0">
          <NavLink to="/ongoing" class="no-underline hover:underline">
            Ongoing
          </NavLink>
          <NavLink to="/upcoming" class="no-underline hover:underline">
            Upcoming
          </NavLink>
          <NavLink to="/results" class="no-underline hover:underline">
            Results
          </NavLink>
          <NavLink to="/leaderboard" class="no-underline hover:underline">
            Leaderboard
          </NavLink>
          <NavLink to="/profile" class="no-underline hover:underline">
            Profile
          </NavLink>
        </nav>
      )}
      {isAuthenticated && (
        <div class="w-1/5 flex justify-center">
          <button
            class="font-semibold text-teal-300 border-2 border-teal-300 rounded-md py-1.5 px-5 hover:bg-teal-700"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      )}
      {!isAuthenticated && (
        <div class="absolute flex justify-center right-0 w-1/5">
          <button
            class="font-semibold text-teal-300 border-2 border-teal-300 rounded-md py-1.5 px-5 hover:bg-teal-700"
            onClick={() => loginWithRedirect()}
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
