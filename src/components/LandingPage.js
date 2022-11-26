import { useEffect } from "react";
import ReactGA from "react-ga";

const LandingPage = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <div class="w-4/5 mx-auto h-full flex flex-col justify-center items-center">
      <h1 class="md:text-5xl text-4xl -mt-36 text-center">Welcome to BetNHLFree</h1>
      <h2 class="md:text-3xl text-2xl mt-8 italic text-center">
        A place where you can bet NHL games with your friends, totally free!
      </h2>
    </div>
  );
};

export default LandingPage;