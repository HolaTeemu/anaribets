import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import menuImg from "../assets/menu-outline.svg";
import closeMenuImg from "../assets/close-outline.svg";
import { useState } from "react";

const Header = () => {
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);

  const menuHandler = () => {
    setIsOpen((prevOpenState) => !prevOpenState);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header class="bg-gray-600 flex w-full max-w-full h-28 items-center z-10">
      <div class={`mx-auto ${user ? "md:w-1/5 w-full" : ""}`}>
        <NavLink to="/">
          <h1 class="md:inline-block md:relative md:h-auto flex justify-center items-center absolute h-28 top-0 xl:text-4xl lg:text-3xl md:text-2xl text-3xl mx-auto text-center hover:text-teal-300 hover:drop-shadow-2xl w-full">
            BetNHLFree
          </h1>
        </NavLink>
      </div>
      <div
        class="flex md:hidden absolute right-0 top-0 h-28 sm:w-28 w-14 justify-center items-center"
        onClick={menuHandler}
      >
        <img
          class="w-10 h-10"
          src={isOpen ? closeMenuImg : menuImg}
          alt="Open menu button"
        />
      </div>
      {user && (
        <div
          class={`top-28 md:top-0 left-0 w-full md:w-4/5 h-2/3 md:h-auto m-0 flex md:flex-row flex-col bg-gray-600 z-10 ${
            isOpen ? "absolute md:relative" : "hidden h-0 md:flex"
          }`}
        >
          <nav class="flex md:flex-row flex-col xl:text-2xl md:text-xl text-3xl w-full h-3/4 md:h-auto min-h-max font-thin md:justify-evenly justify-center items-center">
            <NavLink
              to="/ongoing"
              className={({ isActive }) =>
                isActive
                  ? "text-teal-300 md:my-0 my-3"
                  : "hover:underline md:my-0 my-3"
              }
              onClick={closeMenu}
            >
              Ongoing
            </NavLink>
            <NavLink
              to="/upcoming"
              className={({ isActive }) =>
                isActive
                  ? "text-teal-300 md:my-0 my-3"
                  : "hover:underline md:my-0 my-3"
              }
              onClick={closeMenu}
            >
              Upcoming
            </NavLink>
            <NavLink
              to="/results"
              className={({ isActive }) =>
                isActive
                  ? "text-teal-300 md:my-0 my-3"
                  : "hover:underline md:my-0 my-3"
              }
              onClick={closeMenu}
            >
              Results
            </NavLink>
            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                isActive
                  ? "text-teal-300 md:my-0 my-3"
                  : "hover:underline md:my-0 my-3"
              }
              onClick={closeMenu}
            >
              Leaderboard
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-teal-300 md:my-0 my-3"
                  : "hover:underline md:my-0 my-3"
              }
              onClick={closeMenu}
            >
              Profile
            </NavLink>
          </nav>
          {isAuthenticated && (
            <div class="w-full md:w-1/5 text-lg flex justify-center md:mb-0 mb-10">
              <button
                class="font-semibold text-teal-300 border-2 border-teal-300 rounded-md py-1.5 px-5 hover:bg-teal-700"
                onClick={() => logout()}
              >
                Logout
              </button>
            </div>
          )}
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
