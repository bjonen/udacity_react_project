// Convert complete external state into cards. Write utility function for this.
// Requires knowledge about autghedUser, users, questions

import Grid from "@mui/material/Grid";
import GridCard from "./GridCard";
import { useGetQuestionsQuery, useGetUsersQuery } from "../apiSlice";

const getCardData = (questions, users) => {
  if (!questions || !users) {
    return [];
  }
  let cardData = [];
  let myObject = {};
  Object.keys(questions).forEach((key) => {
    console.log("question", key);
    const quest = questions[key];
    const author = users[quest.author];
    myObject = {
      id: quest.id,
      author: quest.author,
      avatar: author.avatarURL,
      timestmap: quest.timestamp,
    };
    cardData.push(myObject);
  });
  console.log("cardData", cardData);
  return cardData;
};

function OverviewPage() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();
  const {
    data: questions,
    isLoadingQuestions,
    isSuccessQuestions,
    isErrorQuestions,
    errorQuestions,
  } = useGetQuestionsQuery();
  const cardData = getCardData(questions, users);
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
