/* eslint-disable array-callback-return */
import { useDispatch, useSelector } from "react-redux";
import { setResults } from "../store/actions/games";
import gamesService from "../services/gamesService";
import { useEffect } from "react";
import ReactGA from "react-ga";

import ResultsGameCard from "./ResultsGameCard";

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
      <div class="flex mx-auto w-4/12 border-b-2 border-teal-800 pb-4">
        <p class="text-3xl font-semibold w-1/2 text-center">Home</p>
        <p class="text-3xl font-semibold w-1/2 text-center">Away</p>
      </div>
      <div class="flex flex-col mx-auto w-2/4">
        {results.map((game) => {
          const gameId = `${game.awayAbbr}${game.homeAbbr}${
            game.startTime.split("T")[0]
          }`;
          return <ResultsGameCard game={game} key={gameId} />;
        })}
        {results.length === 0 && (
          <h3 class="text-3xl text-center my-20">No results to show</h3>
        )}
      </div>
      <p class="text-md text-center mt-20">
        The colors indicate which team won. <br />
        Indicators about the right and wrong bets will be added later
      </p>
    </div>
  );
};

export default Results;
