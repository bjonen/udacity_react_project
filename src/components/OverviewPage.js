// Convert complete external state into cards. Write utility function for this.
// Requires knowledge about autghedUser, users, questions

import Grid from "@mui/material/Grid";
import GridCard from "./GridCard";
import { useGetQuestionsQuery, useGetUsersQuery } from "../apiSlice";
import { useSelector } from "react-redux";

const getCardData = (questions, users, authedUser) => {
  if (!questions || !users) {
    return {
      cardData: [],
      cardDataCompleted: [],
      cardDataNew: [],
    };
  }
  let cardData = [];
  let cardDataNew = [];
  let cardDataCompleted = [];
  let myObject = {};
  let answers = users[authedUser].answers;
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
    if (answers.hasOwnProperty(key)) {
      cardDataCompleted.push(myObject);
    } else {
      cardDataNew.push(myObject);
    }
    cardData.push(myObject);
  });
  return {
    cardData: cardData,
    cardDataCompleted: cardDataCompleted,
    cardDataNew: cardDataNew,
  };
};

const processGetApis = ({ data, isLoading, isSuccess, isError, error }) => {
  // XXX Add error handling
  return data;
};

function OverviewPage() {
  const authedUser = useSelector((state) => state.authedUser.id);
  const users = processGetApis(useGetUsersQuery());
  const questions = processGetApis(useGetQuestionsQuery());
  const fullCardData = getCardData(questions, users, authedUser);
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
          {fullCardData.cardDataNew.map((card) => (
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
          {fullCardData["cardDataCompleted"].map((card) => (
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
