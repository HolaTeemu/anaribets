import { useSelector } from "react-redux";
import "../styles/RadioButton.scss";
import { createFormattedDate } from "../helpers/helperFunctions";

const GameCard = ({ game, upcomingGame, gameId, ongoingGame }) => {
  const betsState = useSelector((state) => state.users.betsMade);
  let bet = null;

  // Create starting time for upcoming game
  const startTime = createFormattedDate(game.startTime);

  // Away and home abbreviation
  const awayAbbr = game.awayAbbr;
  const homeAbbr = game.homeAbbr;

  // Away and home cities
  const awayCity = game.awayCity;
  const homeCity = game.homeCity;

  // Check if the bet has always been made for the game
  betsState.forEach((game) => {
    if (gameId === game.game) {
      bet = game.bet;
    }
  });

  return (
    <div class="flex flex-col w-full my-6">
      {upcomingGame && (
        <h3 class="text-2xl text-center mb-4 text-teal-400">{startTime}</h3>
      )}
      {ongoingGame && (
        <h3 class="text-xl text-center">{game.currentPeriod} period</h3>
      )}
      <div class="flex items-center w-full">
        {upcomingGame && (
          <div class="w-1/4 flex justify-center">
            <input
              type="radio"
              class="betInput"
              name={gameId}
              value={awayAbbr}
              disabled={bet}
              defaultChecked={bet === awayAbbr ? true : false}
            />
            <div class="circle"></div>
          </div>
        )}
        {!upcomingGame && (
          <p
            class={`text-4xl font-light w-1/4 text-center ${
              game.awayGoals > game.homeGoals
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {game.awayGoals}
          </p>
        )}
        <div class="flex text-4xl font-light w-2/4 text-center">
          <p class="w-1/3">{awayCity}</p>
          <p class="w-1/3">-</p>
          <p class="w-1/3">{homeCity}</p>
        </div>

        {upcomingGame && (
          <div class="w-1/4 flex justify-center">
            <input
              type="radio"
              class="betInput"
              name={gameId}
              value={homeAbbr}
              disabled={bet}
              defaultChecked={bet === homeAbbr ? true : false}
            />
            <div class="circle"></div>
          </div>
        )}
        {!upcomingGame && (
          <p
            class={`text-4xl font-light w-1/4 text-center ${
              game.homeGoals > game.awayGoals
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {game.homeGoals}
          </p>
        )}
      </div>
      {ongoingGame && <h3>{game.currentPeriodTimeLeft}</h3>}
      <div>
        {game.overtime && <p class="text-2xl text-center -mt-3">OT</p>}
        {game.shootout && <p class="text-2xl text-center -mt-3">SO</p>}
      </div>
    </div>
  );
};

export default GameCard;
