import TeamLogo from "./TeamLogo";
import classes from "../styles/GameCard.module.scss";
import { createFormattedDate } from "../helpers/helperFunctions";

const GameCard = ({ game, upcomingGame, gameId }) => {
  // Create starting time for upcoming game
  const startTime = createFormattedDate(game.startTime);

  // Away and home abbreviation
  const awayAbbr = game.teams.away.abbreviation
  const homeAbbr = game.teams.home.abbreviation


  
  return (
    <div className={classes.gameCardContainer}>
      {upcomingGame && <h3>{startTime}</h3>}
      <div className={classes.gameCard}>
        <TeamLogo team={awayAbbr} />
        {upcomingGame ? (
          <input type="radio" className={classes.betInput} name={gameId} />
        ) : (
          <p className={classes.goalAmount}>
            {game.scores[awayAbbr]}
          </p>
        )}

        <p className={classes.teamAbbr}>{awayAbbr}</p>
        <p>-</p>
        <p className={classes.teamAbbr}>{homeAbbr}</p>

        {upcomingGame ? (
          <input type="radio" className={classes.betInput} name={gameId} />
        ) : (
          <p className={classes.goalAmount}>
            {game.scores[homeAbbr]}
          </p>
        )}
        <TeamLogo team={homeAbbr} />
      </div>
    </div>
  );
};

export default GameCard;
