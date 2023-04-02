import "./App.css";
// import ColorSchemesExample from "./components/navbar.js";
import Navbar from "./components/navbar.js";
//import "bootstrap/dist/css/bootstrap.min.css";
import NewPoll from "./components/NewPoll.js";
import PollPage from "./components/PollPage.js";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<PollPage />} />
        <Route path="/new" element={<NewPoll />} />
      </Routes>{" "}
    </div>
  );
}

export default App;
