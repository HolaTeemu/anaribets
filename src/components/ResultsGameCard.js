import "../styles/RadioButton.scss";

const ResultsGameCard = ({ game, bet, highlightReel }) => {
  // Away and home abbreviation
  const awayAbbr = game.awayAbbr;
  const homeAbbr = game.homeAbbr;

  // Away and home cities
  const awayCity = game.awayCity;
  const homeCity = game.homeCity;

  return (
    <div class="flex flex-col w-full my-6">
      {highlightReel && (
        <div class="mx-auto md:w-full sm:w-4/5 w-full">
          <a href={highlightReel} class="flex justify-center">
            Highlights
          </a>
        </div>
      )}
      <div class="flex items-center w-full">
        <div class="flex text-lg xl:text-4xl lg:text-4xl md:text-3xl sm:text-2xl font-light md:w-1/4 w-1/3 sm:text-right text-center">
          <p class="w-full">{`${homeCity} ${
            homeCity === "New York" ? homeAbbr.charAt(2) : ""
          }`}</p>
        </div>
        <div class="flex text-4xl font-light md:w-2/4 w-1/3 text-center">
          <p
            class={`sm:w-1/3 w-2/5 sm:text-3xl text-2xl  flex justify-center items-center ${
              game.homeGoals > game.awayGoals
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {game.homeGoals}
          </p>
          <p class="sm:w-1/3 w-1/5">-</p>
          <p
            class={`sm:w-1/3 w-2/5 sm:text-3xl text-2xl flex justify-center items-center ${
              game.awayGoals > game.homeGoals
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {game.awayGoals}
          </p>
        </div>
        <div class="flex text-lg xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl font-light md:w-1/4 w-1/3 sm:text-left text-center">
          <p class="w-full">{`${awayCity} ${
            awayCity === "New York" ? awayAbbr.charAt(2) : ""
          }`}</p>
        </div>
      </div>

      <div class="mx-auto md:w-full sm:w-4/5 w-full">
        <p class="text-center inline-block w-2/5 text-sm">
          {bet && homeAbbr === bet && "Your bet"}
        </p>
        <div class="text-center inline-block w-1/5">
          {game.overtime && (
            <p class="inline-block lg:text-xl text-base -mt-3">OT</p>
          )}
          {game.shootout && (
            <p class="inline-block lg:text-xl text-base text-center -mt-3">
              SO
            </p>
          )}
        </div>
        <p class="inline-block text-center w-2/5 text-sm">
          {bet && awayAbbr === bet && "Your bet"}
        </p>
      </div>
    </div>
  );
};

export default ResultsGameCard;
