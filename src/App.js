import "./App.css";
// import ColorSchemesExample from "./components/navbar.js";
import Navbar from "./components/navbar.js";
//import "bootstrap/dist/css/bootstrap.min.css";
import NewPoll from "./components/NewPoll.js";
import PollPage from "./components/PollPage.js";
import OverviewPage from "./components/OverviewPage";
import { Routes, Route } from "react-router-dom";
import Leaderboard from "./components/LeaderBoard";
import MenuAppBar from "./components/navbar_mui";

function App() {
  return (
    <div>
      <MenuAppBar />
      <Routes>
        <Route path="/" exact element={<OverviewPage />} />
        <Route path="/pollpage" exact element={<PollPage />} />
        <Route path="/leaderboard" exact element={<Leaderboard />} />
        <Route path="/new" element={<NewPoll />} />
      </Routes>{" "}
    </div>
  );
}

export default App;
