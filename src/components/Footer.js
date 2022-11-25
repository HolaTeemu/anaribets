import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div class="w-full max-w-full flex flex-col items-center mt-5 pb-3 pt-5 bg-gray-600">
      <p class="sm:text-base text-sm w-4/5 text-center">
        The site is still under development but the main functionalities are
        working(for now)
      </p>
      <p class="flex justify-center sm:text-lg text-base mt-2">
        Created by HolaTeemu@Github
      </p>
      <div>
        <NavLink
          to="tos"
          className={({ isActive }) =>
            isActive
              ? "text-teal-300 mr-2"
              : "hover:underline mr-2"
          }
        >
          ToS
        </NavLink>
        <NavLink
          to="privacypolicy"
          className={({ isActive }) =>
            isActive
              ? "text-teal-300 ml-2"
              : "hover:underline ml-2"
          }
        >
          Privacy Policy
        </NavLink>
      </div>
    </div>
  );
};

export default Footer;
