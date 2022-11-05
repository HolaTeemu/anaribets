/* eslint-disable array-callback-return */
import { useDispatch, useSelector } from "react-redux";
import { setUpcomingGames } from "../store/actions/games";
import gamesService from "../services/gamesService";
import { useEffect } from "react";
import classes from "../styles/Upcoming.module.scss";

import GameCard from "./GameCard";

const Upcoming = () => {
  const dispatch = useDispatch();
  const upcomingGames = useSelector((state) => state.upcomingGames);
  const startDate = new Date().toISOString().split("T")[0];
  // const awayAbbr = game.teams.away.abbreviation
  // const homeAbbr = game.teams.home.abbreviation

  // let endDate = new Date();
  // endDate.setDate(+startDate.split("-")[2] + 1);
  // endDate = endDate.toISOString().split("T")[0];

  useEffect(() => {
    if (upcomingGames.length === 0) {
      gamesService.getUpcomingGames(startDate).then((res) => {
        dispatch(setUpcomingGames(res.data[0].games));
      });
    }
  }, [dispatch, startDate, upcomingGames.length]);

  // Create game id for bet inputs FORMAT -> NYIDET20221105 -> AWAY ABBR, HOME ABBR, DATE RAW(YYYY-MM-DD)
  // const gameId = `${awayAbbr}${homeAbbr}${game.startTime.split("T")[0]}`;

  return (
    <div className={classes.upcomingPage}>
      <h2>Tulevat pelit</h2>
      <form>
        {upcomingGames.map((game) => {
          if (game.status.state === "PREVIEW") {
            const gameId = `${game.teams.away.abbreviation}${game.teams.home.abbreviation}${game.startTime.split("T")[0]}`;
            return <GameCard game={game} upcomingGame={true} gameId={gameId} key={gameId} />;
          }
        })}
        <button>Tallenna betsit</button>
      </form>
    </div>
  );
};

export default Upcoming;
