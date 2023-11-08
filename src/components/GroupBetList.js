/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import usersService from "../services/usersService";

const GroupBetList = ({ bets }) => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    bets.forEach((bet) => {
      usersService.getUsername(bet).then((res) => {
        setNames((prevNames) => [...prevNames, res.data]);
      });
    });
  }, []);

  return (
    <div class="pb-2">
      {names.length > 0 &&
        names.map((name) => (
          <p class="text-left text-sm md:text-base">{name}</p>
        ))}
    </div>
  );
};

export default GroupBetList;
