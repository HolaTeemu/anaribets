import { NavLink } from "react-router-dom";
import classes from "../styles/Header.module.scss";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <header>
      <h1 className={classes.logo}>NHLbets</h1>
      <nav className={classes.navLinks}>
        <NavLink to="/ongoing">Ongoing</NavLink>
        <NavLink to="/upcoming">Upcoming</NavLink>
        <NavLink to="/results">Results</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
      {isAuthenticated && <button onClick={() => logout()}>Logout</button>}
    </header>
  );
};

export default Header;
