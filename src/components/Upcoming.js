/* eslint-disable array-callback-return */
import { useDispatch, useSelector } from "react-redux";
import { setUpcomingGames } from "../store/actions/games";
import gamesService from "../services/gamesService";
import { useEffect } from "react";
import ReactGA from "react-ga";

import GameCard from "./GameCard";
import { setBets } from "../store/actions/users";
import usersService from "../services/usersService";

const Upcoming = (props) => {
  const dispatch = useDispatch();
  const upcomingGames = useSelector((state) => state.games.upcomingGames);
  const userId = useSelector((state) => state.users.userId);
  const bets = useSelector((state) => state.users.betsMade);
  const startDate = new Date().toISOString().split("T")[0];

  const handleFormSubmit = (event) => {
    let betsMade = [];
    event.preventDefault();
    for (let i = 0; i < upcomingGames.length * 2; i++) {
      if (event.target[i].checked && !event.target[i].disabled) {
        betsMade = betsMade.concat({
          game: event.target[i].name,
          bet: event.target[i].value,
        });
      }
    }
    dispatch(setBets(betsMade));
    usersService
      .saveBets(betsMade, userId)
      .then((res) => {
        alert("Bets saved");
        console.log("Bets saved");
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    if (upcomingGames.length === 0) {
      gamesService.getUpcomingGames(startDate).then((res) => {
        dispatch(setUpcomingGames(res.data));
      });
    }
    if (bets.length === 0 && userId) {
      usersService
        .getBets(userId)
        .then((res) => {
          dispatch(setBets(res.data));
        })
        .catch((error) => console.log(error.message));
    }
  }, [dispatch, startDate, upcomingGames.length, bets.length, userId]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <>
      <h2 class="text-4xl text-center my-12">Upcoming games</h2>
      <form class="flex flex-col mx-auto w-2/4" onSubmit={handleFormSubmit}>
        {upcomingGames.map((game) => {
          if (game.status === "PREVIEW") {
            const gameId = `${game.awayAbbr}${game.homeAbbr}${
              game.startTime.split("T")[0]
            }`;
            return (
              <GameCard
                game={game}
                upcomingGame={true}
                gameId={gameId}
                key={gameId}
              />
            );
          }
        })}
        {bets.length === upcomingGames.length && upcomingGames.length !== 0 ? (
          <h3 class="text-3xl text-center my-20">Bets done!</h3>
        ) : upcomingGames.length === 0 ? (
          <h3 class="text-3xl text-center my-20">No upcoming games!</h3>
        ) : (
          <button
            class="mt-14 mx-auto w-1/6 font-semibold text-teal-300 border-2 border-teal-300 rounded-md py-1.5 px-5 hover:bg-teal-700"
            type="submit"
          >
            Save bets
          </button>
        )}
      </form>
    </>
  );
};

export default Upcoming;
