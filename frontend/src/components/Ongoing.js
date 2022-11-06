/* eslint-disable array-callback-return */
import { useDispatch, useSelector } from "react-redux";
import { setOngoingGames } from "../store/actions/games";
import gamesService from "../services/gamesService";
import { useEffect, useState } from "react";
import classes from "../styles/Upcoming.module.scss";

import GameCard from "./GameCard";

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

  return (
    <div className={classes.upcomingPage}>
      <h2>Menossa olevat pelit</h2>
      <form onSubmit={handleFormSubmit}>
        {ongoingGames.map((game) => {
          const gameId = `${game.teams.away.abbreviation}${
            game.teams.home.abbreviation
          }${game.startTime.split("T")[0]}`;
          return (
            <GameCard
              game={game}
              ongoingGame={true}
              gameId={gameId}
              key={gameId}
            />
          );
        })}
        {ongoingGames.length === 0 && <h3>Ei menossa olevia pelejä</h3>}
      </form>
    </div>
  );
};

export default Ongoing;
