/* eslint-disable array-callback-return */
import { useDispatch, useSelector } from "react-redux";
import { setResults } from "../store/actions/games";
import gamesService from "../services/gamesService";
import { useEffect } from "react";
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
  }, []);

  return (
    <div>
      <h2 class="text-4xl text-center my-12">Last night's results</h2>
      <div class="flex flex-col mx-auto w-2/4">
        {results.map((game) => {
          if (game.status === "FINAL") {
            const gameId = `${game.awayAbbr}${game.homeAbbr}${
              game.startTime.split("T")[0]
            }`;
            return <GameCard game={game} key={gameId} />;
          }
        })}
      </div>
      <p class="text-md text-center mt-20">
        The colors indicate which team won. <br />
        Indicators about the right and wrong bets will be added later
      </p>
    </div>
  );
};

export default Results;
