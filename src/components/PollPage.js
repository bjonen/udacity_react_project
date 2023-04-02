import Logo from "../avatars/02-man.svg";
import Button from "@mui/material/Button";
const PollPage = () => {
  const name = "sarahedo";
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
        <Button variant="contained">Become a policeman</Button>
        <Button variant="outlined">Become a fireworker</Button>
      </div>
    </div>
  );
};
export default PollPage;
