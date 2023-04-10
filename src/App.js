import "./App.css";
import NewPoll from "./features/questions/NewPoll.js";
import PollPage from "./features/questions/PollPage.js";
import OverviewPage from "./features/users/OverviewPage";
import { Routes, Route } from "react-router-dom";
import Leaderboard from "./features/questions/LeaderBoard";
import MenuAppBar from "./app/Navbar";

function App() {
  return (
    <div>
      <MenuAppBar />
      <Routes>
        <Route path="/" exact element={<OverviewPage />} />
        <Route exact path="/questions/:questionId" element={<PollPage />} />
        <Route path="/leaderboard" exact element={<Leaderboard />} />
        <Route path="/add" element={<NewPoll />} />
      </Routes>{" "}
    </div>
  );
}

export default App;
