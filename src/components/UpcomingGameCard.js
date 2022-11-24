import { useSelector } from "react-redux";
import "../styles/RadioButton.scss";
import { createFormattedDate } from "../helpers/helperFunctions";

const UpcomingGameCard = ({ game, gameId }) => {
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
      <h3 class="text-2xl text-center mb-4 text-teal-400">{startTime}</h3>
      <div class="flex items-center w-full">
        <div class="flex text-4xl font-light w-1/4 text-right">
          <p class="w-full">{`${homeCity} ${
            homeCity === "New York" ? homeAbbr.charAt(2) : ""
          }`}</p>
        </div>
        <div class="flex text-4xl font-light w-2/4 text-center">
          <div class="w-1/3 flex justify-center">
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
          <p class="w-1/3">-</p>
          <div class="w-1/3 flex justify-center">
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
        </div>
        <div class="flex text-4xl font-light w-1/4 text-left">
          <p class="w-full">{`${awayCity} ${
            awayCity === "New York" ? awayAbbr.charAt(2) : ""
          }`}</p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingGameCard;
