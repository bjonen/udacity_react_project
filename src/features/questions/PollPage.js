import Button from "@mui/material/Button";
// https://stackoverflow.com/a/70610481/2146052
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetQuestionsQuery, useGetUsersQuery } from "./questionSlice";
import { useSaveQuestionAnswerMutation } from "./questionSlice.js";

const processGetApis = ({ data, isLoading, isSuccess, isError, error }) => {
  return {
    data,
    isLoading,
  };
};

const PollPage = () => {
  const { questionId } = useParams();
  const authedUser = useSelector((state) => state.authedUser.id);
  const { data: questions } = processGetApis(useGetQuestionsQuery());
  const { data: users } = processGetApis(useGetUsersQuery());
  const [saveQuestionAnswer] = useSaveQuestionAnswerMutation();

  let question = null;
  if (questions) {
    question = questions[questionId];
  } else {
    return <div>loading pollpage</div>;
  }

  if (!questions[questionId]) {
    let msg = "404 Question does not exist";
    if (authedUser === "anonymous") {
      msg += ". Please log in using dropdown on the top right";
    }
    return <div style={{ padding: "10px" }}> {msg} </div>;
  }
  if (authedUser === "anonymous") {
    return (
      <div style={{ padding: "10px" }}>
        Please log in using dropdown on the top right
      </div>
    );
  }
  const answer = users && users[authedUser].answers[questionId];
  const activated = answer && (answer === "optionOne" ? 1 : 2);

  let votes = {
    optionOne: question.optionOne.votes.length,
    optionTwo: question.optionTwo.votes.length,
  };
  votes["total"] = votes.optionOne + votes.optionTwo;
  votes["optionOnePercent"] = Math.round((votes.optionOne / votes.total) * 100);
  votes["optionTwoPercent"] = Math.round((votes.optionTwo / votes.total) * 100);

  const handleClick = (e) => {
    e.preventDefault();
    saveQuestionAnswer({
      authedUser: authedUser,
      qid: questionId,
      answer: e.target.id === "button1" ? "optionOne" : "optionTwo",
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Poll by {users[question.author].name}</h1>
        <img
          src={users && users[question.author].avatarURL}
          alt="Avatar"
          width={125}
          height={125}
        />
        <h3>Would You Rather</h3>
        <div>
          <span
            style={{
              paddingRight: "10px",
            }}
          >
            <Button
              id="button1"
              disabled={answer}
              variant={activated === 1 ? "contained" : "outlined"}
              // variant={"outlined"}
              onClick={handleClick}
            >
              {question.optionOne.text}
            </Button>
          </span>
          <span>
            <Button
              id="button2"
              disabled={answer}
              onClick={handleClick}
              variant={activated === 2 ? "contained" : "outlined"}
            >
              {question.optionTwo.text}
            </Button>
          </span>
        </div>
        {votes.total > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3>Results: </h3>
            <div>
              1) {question.optionOne.text}:{" "}
              {`${votes.optionOne} / ${votes.total} (${votes.optionOnePercent}%)`}
            </div>
            <div>
              2) {question.optionTwo.text}:{" "}
              {`${votes.optionTwo} / ${votes.total} (${votes.optionTwoPercent}%)`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default PollPage;
