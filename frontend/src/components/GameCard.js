import { useDispatch, useSelector } from "react-redux";
import TeamLogo from "./TeamLogo";
import classes from "../styles/GameCard.module.scss";
import { createFormattedDate } from "../helpers/helperFunctions";

const GameCard = ({ game, upcomingGame, gameId, ongoingGame }) => {
  const dispatch = useDispatch();
  const betsState = useSelector((state) => state.bets.betsMade);
  let bet = null;

  // Create starting time for upcoming game
  const startTime = createFormattedDate(game.startTime);

  // Away and home abbreviation
  const awayAbbr = game.awayAbbr;
  const homeAbbr = game.homeAbbr;

  // Check if the bet has always been made for the game
  betsState.forEach((game) => {
    if (gameId === game.game) {
      bet = game.bet;
    }
  });

  return (
    <div className={classes.gameCardContainer}>
      {upcomingGame && <h3>{startTime}</h3>}
      {ongoingGame && <h3>{game.currentPeriod} period</h3>}
      <div className={classes.gameCard}>
        <TeamLogo team={awayAbbr} />
        {upcomingGame && (
          <input
            type="radio"
            className={classes.betInput}
            name={gameId}
            value={awayAbbr}
            disabled={bet}
            defaultChecked={bet === awayAbbr ? true : false}
          />
        )}
        {/* {ongoingGame && <p>{game.scores[awayAbbr]}</p>} */}
        {!upcomingGame && (
          <p className={classes.goalAmount}>{game.awayGoals}</p>
        )}
        <p className={classes.teamAbbr}>{awayAbbr}</p>
        <p>-</p>
        <p className={classes.teamAbbr}>{homeAbbr}</p>

        {upcomingGame && (
          <input
            type="radio"
            className={classes.betInput}
            name={gameId}
            value={homeAbbr}
            disabled={bet}
            defaultChecked={bet === homeAbbr ? true : false}
          />
        )}
        {/* {ongoingGame && <p>{game.homeGoals}</p>} */}
        {!upcomingGame && (
          <p className={classes.goalAmount}>{game.homeGoals}</p>
        )}
        <TeamLogo team={homeAbbr} />
      </div>
      {ongoingGame && (
        <h3>{game.currentPeriodTimeLeft}</h3>
      )}
    </div>
  );
};

export default GameCard;
