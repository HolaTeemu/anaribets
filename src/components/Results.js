/* eslint-disable array-callback-return */
import { useDispatch, useSelector } from "react-redux";
import { setResults } from "../store/actions/games";
import gamesService from "../services/gamesService";
import { useEffect } from "react";
import classes from "../styles/Results.module.scss";

import GameCard from "./GameCard";

const Results = () => {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.results);

  useEffect(() => {
    if (results.length === 0) {
      gamesService
        .getResults()
        .then((res) => {
          dispatch(setResults(res.data.games));
        })
        .catch((error) =>
          console.log(`Error fetching the results - ${error.message}`)
        );
    }
  }, [dispatch, results, results.length]);

  return (
    <div className={classes.resultsPage}>
      <h2>Viime yön tulokset</h2>
      {/* <h3>{startDate}</h3> */}
      {results.map((game) => {
        if (game.status.state === "FINAL") {
          const gameId = `${game.teams.away.abbreviation}${game.teams.home.abbreviation}${game.startTime.split("T")[0]}`;
          return <GameCard game={game} key={gameId} />;
        }
      })}
    </div>
  );
};

export default Results;
