import "./App.css";
// import ColorSchemesExample from "./components/navbar.js";
import Navbar from "./components/navbar.js";
//import "bootstrap/dist/css/bootstrap.min.css";
import NewPoll from "./components/NewPoll.js";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
      <NewPoll />
    </div>
  );
}

export default App;
