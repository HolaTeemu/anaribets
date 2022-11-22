/* eslint-disable array-callback-return */
import { useDispatch, useSelector } from "react-redux";
import { setResults } from "../store/actions/games";
import gamesService from "../services/gamesService";
import { useEffect } from "react";
import classes from "../styles/Results.module.scss";
import ReactGA from "react-ga";

import GameCard from "./GameCard";

const Results = () => {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.games.results);

  useEffect(() => {
    if (results.length === 0) {
      gamesService
        .getResults()
        .then((res) => {
          dispatch(setResults(res.data));
        })
        .catch((error) =>
          console.log(`Error fetching the results - ${error.message}`)
        );
    }
  }, [dispatch, results, results.length]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, [])

  return (
    <div className={classes.resultsPage}>
      <h2>Last night's results</h2>
      {results.map((game) => {
        if (game.status === "FINAL") {
          const gameId = `${game.awayAbbr}${game.homeAbbr}${game.startTime.split("T")[0]}`;
          return <GameCard game={game} key={gameId} />;
        }
      })}
    </div>
  );
};

export default Results;
