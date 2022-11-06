import Header from "./components/Header";
import { Route, Navigate, Routes } from "react-router-dom";
import Ongoing from "./components/Ongoing";
import Upcoming from "./components/Upcoming";
import Leaderboard from "./components/Leaderboard";
import Results from "./components/Results";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="ongoing" element={<Ongoing />} />
        <Route path="upcoming" element={<Upcoming />} />
        <Route path="results" element={<Results />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<Navigate replace to="/upcoming" />} />
      </Routes>
    </div>
  );
}

export default App;
