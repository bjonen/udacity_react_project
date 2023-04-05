// Convert complete external state into cards. Write utility function for this.
// Requires knowledge about autghedUser, users, questions

import Grid from "@mui/material/Grid";
import GridCard from "./GridCard";

let cardData = [
  {
    id: 1,
    author: "sarahedo",
    avatar: "https://i.pravatar.cc/300",
    timestamp: 1467166872634,
  },
  {
    id: 2,
    author: "mtsamis",
    avatar: "https://i.pravatar.cc/301",
    timestamp: 1468479767190,
  },
  {
    id: 3,
    author: "mtsamis",
    avatar: "https://i.pravatar.cc/301",
    timestamp: 1468479767190,
  },
  {
    id: 4,
    author: "mtsamis",
    avatar: "https://i.pravatar.cc/301",
    timestamp: 1468479767190,
  },
];

function OverviewPage() {
  return (
    <div>
      <div
        style={{
          border: "1px solid gray",
          marginTop: "10px",
          marginRight: "10px",
          marginLeft: "10px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>New Questions</h1>
          </Grid>
          {cardData.map((card) => (
            <Grid key={card.id} item xs={12} sm={6} md={3}>
              <GridCard key={card.id} card={card} />
            </Grid>
          ))}
        </Grid>
      </div>

      <div
        style={{
          border: "1px solid gray",
          marginTop: "10px",
          marginRight: "10px",
          marginLeft: "10px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>Completed Questions</h1>
          </Grid>
          {cardData.map((card) => (
            <Grid key={card.id} item xs={12} sm={6} md={3}>
              <GridCard key={card.id} card={card} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default OverviewPage;
