/* eslint-disable array-callback-return */
import { useDispatch, useSelector } from "react-redux";
import { setOngoingGames } from "../store/actions/games";
import gamesService from "../services/gamesService";
import { useEffect } from "react";
import ReactGA from "react-ga";

import OngoingGameCard from "./OngoingGameCard";

const Ongoing = () => {
  const dispatch = useDispatch();
  const ongoingGames = useSelector((state) => state.games.ongoingGames);
  const startDate = new Date().toISOString().split("T")[0];
  let betsMade = [];

  const handleFormSubmit = (event) => {
    event.preventDefault();
    for (let i = 0; i < ongoingGames.length * 2; i++) {
      if (event.target[i].checked) {
        betsMade = betsMade.concat({
          game: event.target[i].name,
          bet: event.target[i].value,
        });
      }
    }
  };

  useEffect(() => {
    if (ongoingGames.length === 0) {
      gamesService.getOngoingGames(startDate).then((res) => {
        dispatch(setOngoingGames(res.data));
      });
    }
  }, [dispatch, startDate, ongoingGames.length]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <div>
      <h2 class="text-4xl text-center my-12">Ongoing games</h2>
      <div class="flex mx-auto w-4/12 border-b-2 border-teal-800 pb-4">
        <p class="text-3xl font-semibold w-1/2 text-center">Home</p>
        <p class="text-3xl font-semibold w-1/2 text-center">Away</p>
      </div>
      <div class="flex flex-col mx-auto w-2/4">
        <form onSubmit={handleFormSubmit}>
          {ongoingGames.map((game) => {
            const gameId = `${game.awayAbbr}${game.homeAbbr}${
              game.startTime.split("T")[0]
            }`;
            return <OngoingGameCard game={game} gameId={gameId} key={gameId} />;
          })}
          {ongoingGames.length === 0 && (
            <h3 class="text-3xl text-center my-20">
              Waiting for games to start...
            </h3>
          )}
        </form>
      </div>
    </div>
  );
};

export default Ongoing;
