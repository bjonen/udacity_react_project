import "./App.css";
import NewPoll from "./components/NewPoll.js";
import PollPage from "./components/PollPage.js";
import OverviewPage from "./components/OverviewPage";
import { Routes, Route } from "react-router-dom";
import Leaderboard from "./components/LeaderBoard";
import MenuAppBar from "./components/Navbar";

function App() {
  return (
    <div>
      <MenuAppBar />
      <Routes>
        <Route path="/" exact element={<OverviewPage />} />
        <Route exact path="/pollpage/:questionId" element={<PollPage />} />
        <Route path="/leaderboard" exact element={<Leaderboard />} />
        <Route path="/new" element={<NewPoll />} />
      </Routes>{" "}
    </div>
  );
}

export default App;
