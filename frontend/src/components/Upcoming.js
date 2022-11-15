/* eslint-disable array-callback-return */
import { useDispatch, useSelector } from "react-redux";
import { setUpcomingGames } from "../store/actions/games";
import gamesService from "../services/gamesService";
import { useEffect, useState } from "react";
import classes from "../styles/Upcoming.module.scss";

import GameCard from "./GameCard";
import { setBets } from "../store/actions/bets";
import betsService from "../services/betsService";

const Upcoming = (props) => {
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
    betsService.saveBets(betsMade, props.user)
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
    if (bets.length === 0) {
      betsService.getBets(props.user)
      .then((res) => {
        dispatch(setBets(res.data));
      })
      .catch((error) => console.log(error.message));
    }
  }, [dispatch, startDate, upcomingGames.length, bets.length]);

  return (
    <div className={classes.upcomingPage}>
      <h2>Tulevat pelit</h2>
      <form onSubmit={handleFormSubmit}>
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
          <h3>Kaikki betsit tehty!</h3>
        ) : upcomingGames.length === 0 ? (
          <h3>No upcoming games!</h3>
        ) : (
          <button type="submit">Tallenna betsit</button>
        )}
      </form>
    </div>
  );
};

export default Upcoming;
