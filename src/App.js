import Header from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import Ongoing from "./components/Ongoing";
import Upcoming from "./components/Upcoming";
import Leaderboard from "./components/Leaderboard";
import Results from "./components/Results";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/ongoing" element={<Ongoing />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/results" element={<Results />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<Navigate to="/upcoming" />} />
      </Routes>
    </div>
  );
}

export default App;
