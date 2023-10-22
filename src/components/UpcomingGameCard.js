import { useSelector } from "react-redux";
import "../styles/RadioButton.scss";
import { createFormattedDate } from "../helpers/helperFunctions";

const UpcomingGameCard = ({
  game,
  gameId,
  homeBetAmount = null,
  awayBetAmount = null,
}) => {
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

  // Variables for home and away bet percentages
  let homeBetPercentage;
  let awayBetPercentage;

  if (homeBetAmount >= 0) {
    homeBetPercentage = Math.floor(
      (homeBetAmount / (homeBetAmount + awayBetAmount)) * 100
    );
    awayBetPercentage = Math.floor(
      (awayBetAmount / (awayBetAmount + homeBetAmount)) * 100
    );
  }

  return (
    <div class="flex flex-col w-full my-6">
      <h3 class="lg:text-2xl text-xl text-center mb-4 text-teal-400">
        {startTime}
      </h3>
      <div class="flex items-center w-full">
        <div class="flex text-lg xl:text-4xl lg:text-4xl md:text-3xl sm:text-2xl font-light md:w-1/4 w-1/3 sm:text-right text-center">
          <p class="w-full">{`${homeCity} ${
            homeCity === "New York" ? homeAbbr.charAt(2) : ""
          }`}</p>
        </div>
        <div class="flex text-4xl font-light md:w-2/4 w-1/3 text-center">
          <div class="sm:w-1/3 w-2/5 flex justify-center items-center">
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
          <p class="sm:w-1/3 w-1/5">-</p>
          <div class="sm:w-1/3 w-2/5 flex justify-center items-center">
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
        <div class="flex text-lg xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl font-light md:w-1/4 w-1/3 sm:text-left text-center">
          <p class="w-full">{`${awayCity} ${
            awayCity === "New York" ? awayAbbr.charAt(2) : ""
          }`}</p>
        </div>
      </div>
      {bet && (
        <>
          <div class="mx-auto md:w-full sm:w-4/5 w-full">
            <p
              class={`text-center inline-block w-2/5 text-lg ${
                bet === homeAbbr &&
                (homeBetPercentage > awayBetPercentage
                  ? "text-green-300"
                  : homeBetPercentage !== awayBetPercentage && "text-red-300")
              }`}
            >
              {!isNaN(homeBetPercentage) && `${homeBetPercentage}%`}
            </p>
            <div class="text-center inline-block w-1/5 mt-3">
              {!isNaN(homeBetPercentage) && !isNaN(awayBetPercentage) && (
                <p class="inline-block lg:text-base text-sm">Bet %</p>
              )}
            </div>

            <p
              class={`text-center inline-block w-2/5 text-lg ${
                bet === awayAbbr &&
                (awayBetPercentage > homeBetPercentage
                  ? "text-green-300"
                  : awayBetPercentage !== homeBetPercentage && "text-red-300")
              }`}
            >
              {!isNaN(awayBetPercentage) && `${awayBetPercentage}%`}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default UpcomingGameCard;
