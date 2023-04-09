// Polls can only be answered once.
// Need to know the authedUser
// Question id will be passed via the URL
// If question exists, display the answers so far for current user.
// If still unanswered the user can choose. The result needs to be transmitted to
// the global state.

import Logo from "../avatars/02-man.svg";
import Button from "@mui/material/Button";
import { useState } from "react";
// https://stackoverflow.com/a/70610481/2146052
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetQuestionsQuery, useGetUsersQuery } from "../apiSlice";
import { useSaveQuestionAnswerMutation } from "../apiSlice.js";

const processGetApis = ({ data, isLoading, isSuccess, isError, error }) => {
  return {
    data,
    isLoading,
  };
};

const PollPage = () => {
  const { questionId } = useParams();
  const authedUser = useSelector((state) => state.authedUser.id);
  const { data: questions, isLoading: isLoadingQuestions } = processGetApis(
    useGetQuestionsQuery()
  );
  const { data: users, isLoading: isLoadingUsers } = processGetApis(
    useGetUsersQuery()
  );
  const [saveQuestionAnswer, { isLoading: isLoadingSave }] =
    useSaveQuestionAnswerMutation();

  const answer = users && users[authedUser].answers[questionId];
  const activated = answer && (answer === "optionOne" ? 1 : 2);

  let question = null;
  if (questions) {
    question = questions[questionId];
  } else {
    return <div>loading pollpage</div>;
  }

  const handleClick = (e) => {
    e.preventDefault();
    saveQuestionAnswer({
      authedUser: authedUser,
      qid: questionId,
      answer: e.target.id === "button1" ? "optionOne" : "optionTwo",
    });
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
      <h1>Poll by {question.author}</h1>
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
            onClick={handleClick}
            variant={activated === 2 ? "contained" : "outlined"}
          >
            {question.optionTwo.text}
          </Button>
        </span>
      </div>
    </div>
  );
};
export default PollPage;
