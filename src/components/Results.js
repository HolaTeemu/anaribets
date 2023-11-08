/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useDispatch, useSelector } from "react-redux";
import { setLastNightsBets, setResults } from "../store/actions/games";
import gamesService from "../services/gamesService";
import usersService from "../services/usersService";
import { useEffect, useState } from "react";
import ReactGA from "react-ga";
import ResultsGameCard from "./ResultsGameCard";

const Results = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const results = useSelector((state) => state.games.results);
  const lastNightsBets = useSelector((state) => state.games.lastNightsBets);
  const userId = useSelector((state) => state.users.userId);
  let resultsGameIds = results.map((result) => result.gameId);

  useEffect(() => {
    if (results.length === 0) {
      setIsLoading(true);
      gamesService
        .getResults()
        .then((res) => {
          dispatch(setResults(res.data));
          setIsLoading(false);
        })
        .catch((error) =>
          console.log(`Error fetching the results - ${error.message}`)
        );
    }
  }, [dispatch, results.length]);

  useEffect(() => {
    if (results.length > 0 && lastNightsBets.length !== results.length) {
      resultsGameIds = results.map((result) => result.gameId);
      usersService.getLastNightsBets(userId, resultsGameIds).then((result) => {
        dispatch(setLastNightsBets(result.data));
        setIsLoading(false);
      });
    }
  }, [dispatch, lastNightsBets.length, results, userId]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <div class="flex flex-col mx-auto w-full xl:w-2/4 lg:w-3/4 md:w-5/6">
      <h2 class="text-2xl sm:text-3xl lg:text-4xl text-center my-12">
        Last night's results
      </h2>
      <div class="flex mx-auto sm:w-2/3 w-4/5 border-b-2 border-teal-800 pb-4">
        <p class="text-xl sm:text-2xl lg:text-3xl font-semibold w-1/2 text-center">
          Home
        </p>
        <p class="text-xl sm:text-2xl lg:text-3xl font-semibold w-1/2 text-center">
          Away
        </p>
      </div>
      {results.map((game) => {
        const betObject = lastNightsBets.find((el) => el.game === game.gameId);
        const gameId = `${game.awayAbbr}${game.homeAbbr}${
          game.startTime.split("T")[0]
        }`;
        return (
          <ResultsGameCard
            game={game}
            key={gameId}
            bet={betObject?.bet}
            highlightReel={betObject?.highlightReel}
          />
        );
      })}
      {isLoading ? (
        <h3 class="text-3xl text-center my-20">Loading results...</h3>
      ) : (
        results.length === 0 &&
        !isLoading && (
          <h3 class="text-3xl text-center my-20">No results to show</h3>
        )
      )}
    </div>
  );
};

export default Results;
