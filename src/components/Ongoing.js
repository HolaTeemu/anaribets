/* eslint-disable array-callback-return */
import { useDispatch, useSelector } from "react-redux";
import { setLastNightsBets, setOngoingGames } from "../store/actions/games";
import gamesService from "../services/gamesService";
import { useEffect } from "react";
import ReactGA from "react-ga";

import OngoingGameCard from "./OngoingGameCard";

const Ongoing = () => {
  const dispatch = useDispatch();
  const ongoingGames = useSelector((state) => state.games.ongoingGames);
  const lastNightsBets = useSelector((state) => state.games.lastNightsBets);
  const userId = useSelector((state) => state.users.userId);

  const startDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (ongoingGames.length === 0) {
      gamesService.getOngoingGames(startDate).then((res) => {
        dispatch(setOngoingGames(res.data));
      });
    }
  }, [dispatch, startDate, ongoingGames.length]);

  useEffect(() => {
    if (ongoingGames.length > 0 && lastNightsBets.length !== ongoingGames.length) {
      const resultsGameIds = ongoingGames.map((result) => result.gameId);
      gamesService.getLastNightsBets(userId, resultsGameIds).then((result) => {
        dispatch(setLastNightsBets(result.data));
      });
    }
  }, [dispatch, lastNightsBets.length, ongoingGames, userId]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <div class="flex flex-col mx-auto w-full xl:w-2/4 lg:w-3/4 md:w-5/6">
      <h2 class="text-2xl sm:text-3xl lg:text-4xl text-center my-12">
        Ongoing games
      </h2>
      <div class="flex mx-auto sm:w-2/3 w-4/5 border-b-2 border-teal-800 pb-4">
        <p class="text-xl sm:text-2xl lg:text-3xl font-semibold w-1/2 text-center">
          Home
        </p>
        <p class="text-xl sm:text-2xl lg:text-3xl font-semibold w-1/2 text-center">
          Away
        </p>
      </div>
      {ongoingGames.map((game) => {
        const betObject = lastNightsBets.find((el) => el.game === game.gameId);
        const gameId = `${game.awayAbbr}${game.homeAbbr}${
          game.startTime.split("T")[0]
        }`;
        return <OngoingGameCard game={game} gameId={gameId} key={gameId} bet={betObject?.bet} />;
      })}
      {ongoingGames.length === 0 && (
        <h3 class="text-3xl text-center my-20">
          Waiting for games to start...
        </h3>
      )}
    </div>
  );
};

export default Ongoing;
