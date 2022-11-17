import Header from "./components/Header";
import { Route, Navigate, Routes } from "react-router-dom";
import Ongoing from "./components/Ongoing";
import Upcoming from "./components/Upcoming";
import Leaderboard from "./components/Leaderboard";
import Results from "./components/Results";
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "./components/LoginPage";

function App() {
  const { user } = useAuth0();

  return (
    <div className="App">
      {!user ? (
        <LoginPage />
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="ongoing" element={<Ongoing />} />
            <Route path="upcoming" element={<Upcoming user={user.given_name} />} />
            <Route path="results" element={<Results />} />
            <Route path="leaderboard" element={<Leaderboard user={user.given_name} />} />
            <Route path="*" element={<Navigate replace to="/upcoming" />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
