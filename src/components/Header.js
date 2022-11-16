import { NavLink } from "react-router-dom";
import classes from "../styles/Header.module.scss";

const Header = () => {
  return (
    <header>
        <h1 className={classes.logo}>NHLbets</h1>
        <nav className={classes.navLinks}>
            <NavLink to="/ongoing">Ongoing</NavLink>
            <NavLink to="/upcoming">Upcoming</NavLink>
            <NavLink to="/results">Results</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
        </nav>
    </header>
  );
};

export default Header;
