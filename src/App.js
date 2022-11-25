import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Navigate, Routes } from "react-router-dom";
import Ongoing from "./components/Ongoing";
import Upcoming from "./components/Upcoming";
import Leaderboard from "./components/Leaderboard";
import Results from "./components/Results";
import { useAuth0 } from "@auth0/auth0-react";
import LandingPage from "./components/LandingPage";
import { useDispatch } from "react-redux";
import Profile from "./components/Profile";
import { useEffect } from "react";
import usersService from "./services/usersService";
import { setUserDetails } from "./store/actions/users";
import ReactGA from "react-ga";
import TOS from "./components/TOS";
import PrivacyPolicy from "./components/PrivacyPolicy";

const TRACKING_ID = "UA-217792756-2";
ReactGA.initialize(TRACKING_ID);

function App() {
  const dispatch = useDispatch();
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      usersService
        .checkIfUserExists(user.email)
        .then((result) => {
          if (result.data.length === 0) {
            usersService
              .createUser(user.given_name || user.nickname, user.email)
              .then((result) => {
                const { username, id } = result.data;
                dispatch(setUserDetails(username, id));
              });
          } else {
            const { username, id } = result.data;
            dispatch(setUserDetails(username, id));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dispatch, user]);

  return (
    <div className="text-gray-300 w-full min-w-screen max-w-full h-full min-h-screen bg-gray-700 grid grid-rows-sticky-layout font-poppins">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="tos" element={<TOS />} />
        <Route path="privacypolicy" element={<PrivacyPolicy />} />
        {user && (
          <>
            <Route path="ongoing" element={<Ongoing />} />
            <Route path="upcoming" element={<Upcoming />} />
            <Route path="results" element={<Results />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="profile" element={<Profile />} />
          </>
        )}
        <Route path="*" exact element={<Navigate replace to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
