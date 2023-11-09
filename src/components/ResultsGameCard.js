import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../styles/RadioButton.scss";
import usersService from "../services/usersService";
import GroupBetList from "./GroupBetList";

const ResultsGameCard = ({ game, bet, highlightReel }) => {
  const [showHomeList, setShowHomeList] = useState(false);
  const [showAwayList, setShowAwayList] = useState(false);
  const userId = useSelector((state) => state.users.userId);
  const [betList, setBetList] = useState([]);

  // Away and home abbreviation
  const awayAbbr = game.awayAbbr;
  const homeAbbr = game.homeAbbr;

  // Away and home cities
  const awayCity = game.awayCity;
  const homeCity = game.homeCity;

  console.log(bet && homeAbbr === bet && !showHomeList);
  console.log(bet && awayAbbr === bet && !showAwayList);

  /*
  // Away and home betlists
  const groupLists = [];

  useEffect(() => {
    if (game) {
      usersService.getSingleGameBetLists(userId, game.gameId).then((res) => {
        setBetList(res.data);
      });
    }
  }, [game, userId]);

  const getGroupLists = () => {
    betList.forEach((group) => {
      groupLists.push({
        groupName: group.groupName,
        awayBets: [],
        homeBets: [],
      });

      if (groupLists.find((g) => g.groupName === group.groupName)) {
        group.players.forEach((playersBet) => {
          if (
            playersBet.bet === awayAbbr &&
            !groupLists
              .find((g) => g.groupName === group.groupName)
              .awayBets.includes(playersBet.user)
          ) {
            groupLists.find((g) => g.groupName === group.groupName).awayBets = [
              ...groupLists.find((g) => g.groupName === group.groupName)
                .awayBets,
              playersBet.user,
            ];
          } else if (
            playersBet.bet === homeAbbr &&
            !groupLists
              .find((g) => g.groupName === group.groupName)
              .homeBets.includes(playersBet.user)
          ) {
            groupLists.find((g) => g.groupName === group.groupName).homeBets = [
              ...groupLists.find((g) => g.groupName === group.groupName)
                .homeBets,
              playersBet.user,
            ];
          }
        });
      }
    });
  };
  
  getGroupLists();
  */
  return (
    <div class="flex flex-col w-full my-6">
      {highlightReel && (
        <div class="mx-auto sm:w-4/5 w-min">
          <a
            href={highlightReel}
            class="mx-auto py-2 px-4 w-min flex justify-center underline text-m text-teal-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Highlights
          </a>
        </div>
      )}
      <div class="flex items-center w-full py-3">
        <div
          class="flex text-lg xl:text-4xl lg:text-4xl md:text-3xl sm:text-2xl font-light md:w-1/4 w-1/3 sm:text-right text-center cursor-pointer"
          // onClick={() => setShowHomeList(!showHomeList)}
        >
          <p class="w-full">{`${homeCity} ${
            homeCity === "New York" ? homeAbbr.charAt(2) : ""
          }`}</p>
        </div>
        <div class="flex text-4xl font-light md:w-2/4 w-1/3 text-center">
          <p
            class={`sm:w-1/3 w-2/5 sm:text-3xl text-2xl  flex justify-center items-center cursor-pointer 
            ${
              game.homeGoals > game.awayGoals
                ? "text-green-400"
                : "text-red-400"
            }`}
            // onClick={() => setShowHomeList(!showHomeList)}
          >
            {game.homeGoals}
          </p>
          <p class="sm:w-1/3 w-1/5">-</p>
          <p
            class={`sm:w-1/3 w-2/5 sm:text-3xl text-2xl flex justify-center items-center cursor-pointer 
            ${
              game.awayGoals > game.homeGoals
                ? "text-green-400"
                : "text-red-400"
            }`}
            // onClick={() => setShowAwayList(!showAwayList)}
          >
            {game.awayGoals}
          </p>
        </div>
        <div
          class="flex text-lg xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl font-light md:w-1/4 w-1/3 sm:text-left text-center cursor-pointer"
          // onClick={() => setShowAwayList(!showAwayList)}
        >
          <p class="w-full">{`${awayCity} ${
            awayCity === "New York" ? awayAbbr.charAt(2) : ""
          }`}</p>
        </div>
      </div>

      <div class="mx-auto md:w-full sm:w-4/5 w-full">
        <p class="text-center inline-block w-2/5 text-sm">
          {bet && homeAbbr === bet && !showHomeList && "Your bet"}
          {/*
          <div>
            <div
              class={`${
                showHomeList ? "flex flex-col" : "hidden"
              } mx-auto w-fit px-8 py-2 relative bg-gray-600 rounded-md`}
            >
              <p class="md:text-base text-sm font-semibold underline">Bets:</p>
              
              {groupLists &&
                groupLists.map((group) => (
                  <>
                    {group.homeBets.length !== 0 && (
                      <p class="text-left text-lg font-bold text-teal-300">
                        {group.groupName}
                      </p>
                    )}
                    <GroupBetList bets={group.homeBets} />
                  </>
                ))}
                 
            </div>
          </div> */}
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
          {bet && awayAbbr === bet && !showAwayList && "Your bet"}
          {/* 
            <div>
              <div
                class={`${
                  showAwayList ? "flex flex-col" : "hidden"
                } mx-auto w-fit px-10 py-2 relative bg-gray-600 rounded-md`}
              >
                <p class="md:text-base pb-1 text-sm font-semibold underline">
                  Bets:
                </p>
                
                {groupLists &&
                  groupLists.map((group) => (
                    <>
                      {group.awayBets.length !== 0 && (
                        <p class="text-left text-lg font-bold text-teal-300">
                          {group.groupName}
                        </p>
                      )}
                      <GroupBetList bets={group.awayBets} />
                    </>
                  ))}
                
              </div>
            </div>
            */}
        </p>
      </div>
    </div>
  );
};

export default ResultsGameCard;
