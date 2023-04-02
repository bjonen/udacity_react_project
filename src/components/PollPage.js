import Logo from "../avatars/02-man.svg";
import Button from "@mui/material/Button";
import { useState } from "react";

const PollPage = () => {
  const name = "sarahedo";
  const [activated, setActivated] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.id === "button1") {
      setActivated(1);
    } else {
      setActivated(2);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Poll by {name}</h1>
      <img src={Logo} alt="Avatar" width={125} height={125} />
      <h3>Would You Rather</h3>
      <div>
        <span
          style={{
            paddingRight: "10px",
          }}
        >
          <Button
            id="button1"
            variant={activated === 1 ? "contained" : "outlined"}
            // variant={"outlined"}
            onClick={handleClick}
          >
            Become a policeman
          </Button>
        </span>
        <span>
          <Button
            id="button2"
            onClick={handleClick}
            variant={activated === 2 ? "contained" : "outlined"}
          >
            Become a fireworker
          </Button>
        </span>
      </div>
    </div>
  );
};
export default PollPage;
