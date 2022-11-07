/* eslint-disable array-callback-return */
import { useDispatch, useSelector } from "react-redux";
import { setUpcomingGames } from "../store/actions/games";
import gamesService from "../services/gamesService";
import { useEffect, useState } from "react";
import classes from "../styles/Upcoming.module.scss";

import GameCard from "./GameCard";
import { setBets } from "../store/actions/bets";

const Upcoming = () => {
  const dispatch = useDispatch();
  const upcomingGames = useSelector((state) => state.games.upcomingGames);
  const bets = useSelector((state) => state.bets.betsMade);
  const startDate = new Date().toISOString().split("T")[0];

  const handleFormSubmit = (event) => {
    let betsMade = [];
    event.preventDefault();
    for (let i = 0; i < upcomingGames.length * 2; i++) {
      if (event.target[i].checked) {
        betsMade = betsMade.concat({
          game: event.target[i].name,
          bet: event.target[i].value,
        });
      }
    }
    dispatch(setBets(betsMade));
  };

  useEffect(() => {
    if (upcomingGames.length === 0) {
      gamesService.getUpcomingGames(startDate).then((res) => {
        dispatch(setUpcomingGames(res.data));
      });
    }
  }, [dispatch, startDate, upcomingGames.length]);

  return (
    <div className={classes.upcomingPage}>
      <h2>Tulevat pelit</h2>
      <form onSubmit={handleFormSubmit}>
        {upcomingGames.map((game) => {
          if (game.status === "PREVIEW") {
            const gameId = `${game.awayAbbr}${game.homeAbbr}${game.startTime.split("T")[0]}`;
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
        {bets.length === upcomingGames.length ? (
          <p>Kaikki betsit tehty!</p>
        ) : (
          <button type="submit">Tallenna betsit</button>
        )}
      </form>
    </div>
  );
};

export default Upcoming;
