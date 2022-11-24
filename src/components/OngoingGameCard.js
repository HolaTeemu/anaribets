import "../styles/RadioButton.scss";

const GameCard = ({ game, gameId }) => {
  // Away and home abbreviation
  const awayAbbr = game.awayAbbr;
  const homeAbbr = game.homeAbbr;

  // Away and home cities
  const awayCity = game.awayCity;
  const homeCity = game.homeCity;

  return (
    <div class="flex flex-col w-full my-6">
      <h3 class="text-xl text-center">{game.currentPeriod} period</h3>
      <div class="flex items-center w-full">
        <div class="flex text-4xl font-light w-1/4 text-right">
          <p class="w-full">{`${homeCity} ${
            homeCity === "New York" ? homeAbbr.charAt(2) : ""
          }`}</p>
        </div>
        <div class="flex text-4xl font-light w-2/4 text-center">
          <p
            class={`text-4xl font-light w-1/3 text-center ${
              game.homeGoals > game.awayGoals
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {game.homeGoals}
          </p>
          <p class="w-1/3">-</p>
          <p
            class={`text-4xl font-light w-1/3 text-center ${
              game.awayGoals > game.homeGoals
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {game.awayGoals}
          </p>
        </div>
        <div class="flex text-4xl font-light w-1/4 text-left">
          <p class="w-full">{`${awayCity} ${
            awayCity === "New York" ? awayAbbr.charAt(2) : ""
          }`}</p>
        </div>
      </div>
      <h3 class="text-center">{game.currentPeriodTimeLeft} remaining</h3>
    </div>
  );
};

export default GameCard;
