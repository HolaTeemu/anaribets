import "../styles/RadioButton.scss";

const ResultsGameCard = ({ game }) => {
  // Create starting time for upcoming game

  // Away and home abbreviation
  const awayAbbr = game.awayAbbr;
  const homeAbbr = game.homeAbbr;

  // Away and home cities
  const awayCity = game.awayCity;
  const homeCity = game.homeCity;

  return (
    <div class="flex flex-col w-full my-6">
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
      <div>
        {game.overtime && <p class="text-2xl text-center -mt-3">OT</p>}
        {game.shootout && <p class="text-2xl text-center -mt-3">SO</p>}
      </div>
    </div>
  );
};

export default ResultsGameCard;
