/* eslint-disable array-callback-return */
import { useDispatch, useSelector } from "react-redux";
import { setUpcomingGames } from "../store/actions/games";
import gamesService from "../services/gamesService";
import { useEffect, useState } from "react";
import ReactGA from "react-ga";

import UpcomingGameCard from "./UpcomingGameCard";
import { setBets } from "../store/actions/users";
import usersService from "../services/usersService";

const Upcoming = (props) => {
  const dispatch = useDispatch();
  const upcomingGames = useSelector((state) => state.games.upcomingGames);
  const userId = useSelector((state) => state.users.userId);
  const bets = useSelector((state) => state.users.betsMade);
  const startDate = new Date().toISOString().split("T")[0];
  const [isLoading, setIsLoading] = useState(false);
  const [betAmounts, setBetAmounts] = useState([]);

  const handleFormSubmit = (event) => {
    let betsMade = [];
    event.preventDefault();
    for (let i = 0; i < upcomingGames.length * 2; i++) {
      if (event.target[i].checked && !event.target[i].disabled) {
        betsMade = betsMade.concat({
          game: +event.target[i].name,
          bet: event.target[i].value,
        });
      }
    }
    dispatch(setBets(betsMade));
    usersService
      .saveBets(betsMade, userId)
      .then((res) => {
        alert("Bets saved");
      })
      .catch((error) => console.log(error.message));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    usersService.getBetAmounts(userId).then((res) => {
      setBetAmounts(res.data);
    });
  };

  useEffect(() => {
    if (upcomingGames.length === 0) {
      setIsLoading(true);
      gamesService.getUpcomingGames(startDate).then((res) => {
        dispatch(setUpcomingGames(res.data));
        setIsLoading(false);
      });
    }
    if (bets.length === 0 && userId) {
      usersService
        .getBets(userId)
        .then((res) => {
          dispatch(setBets(res.data));
        })
        .catch((error) => console.log(error.message));
    }
  }, [dispatch, startDate, upcomingGames.length, bets.length, userId]);

  useEffect(() => {
    if (bets.length !== 0) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      usersService.getBetAmounts(userId).then((res) => {
        setBetAmounts(res.data);
      });
    }
  }, [bets.length, userId]);

  const calculateBetAmount = () => {
    let betNumber = 0;
    bets.forEach((bet) => {
      if (
        upcomingGames.find((upcomingGame) => upcomingGame.gameId === bet.game)
      ) {
        betNumber++;
      }
    });
    return betNumber;
  };

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <>
      <form
        class="flex flex-col mx-auto w-full xl:w-2/4 lg:w-3/4 md:w-5/6"
        onSubmit={handleFormSubmit}
      >
        <h2 class="text-2xl sm:text-3xl lg:text-4xl text-center my-12">
          Upcoming games
        </h2>
        <div class="flex mx-auto sm:w-2/3 w-4/5 border-b-2 border-teal-800 pb-4">
          <p class="text-xl sm:text-2xl lg:text-3xl font-semibold w-1/2 text-center">
            Home
          </p>
          <p class="text-xl sm:text-2xl lg:text-3xl font-semibold w-1/2 text-center">
            Away
          </p>
        </div>
        {upcomingGames.length > 0 &&
          upcomingGames.map((game) => {
            const betAmountsObj = betAmounts.find((el) => el.gameId === game.gameId);
            let homeBets;
            let awayBets;
            if (betAmountsObj) {
              homeBets = betAmountsObj[game.homeAbbr];
              awayBets = betAmountsObj[game.awayAbbr];
            }
            return (
              <UpcomingGameCard
                game={game}
                gameId={game.gameId}
                key={game.gameId}
                homeBetAmount={homeBets}
                awayBetAmount={awayBets}
              />
            );
          })}
        {calculateBetAmount() === upcomingGames.length &&
        upcomingGames.length !== 0 ? (
          <h3 class="text-3xl text-center my-20 ">Bets done!</h3>
        ) : isLoading ? (
          <h3 class="text-3xl text-center my-20">Loading games...</h3>
        ) : upcomingGames.length === 0 && !isLoading ? (
          <h3 class="text-3xl text-center my-20">
            No games on the upcoming night
          </h3>
        ) : (
          <button
            class="my-14 mx-auto w-auto font-semibold text-teal-300 border-2 border-teal-300 rounded-md py-1.5 px-5 hover:bg-teal-700"
            type="submit"
          >
            Save bets
          </button>
        )}
      </form>
    </>
  );
};

export default Upcoming;
