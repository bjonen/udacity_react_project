// Run with node try_api.mjs
// This module allows to test the API calls in the REPL.

import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA.js";
//const parse = require("./_DATA.mjs");

async function getdata() {
  var response = await _getUsers();
  console.log("users", response);
  response = await _getQuestions();
  console.log("questions", response);
  console.log(response["vthrdm985a262al8qx3do"]["optionOne"]["votes"]);
  response = await _saveQuestion({
    optionOneText: "Be a good person",
    optionTwoText: "Be a bad person",
    author: "tylermcginnis",
  });

  const newid = response.id;
  console.log("newid", newid);
  response = await _getQuestions();
  console.log("questions", response);
  response = await _saveQuestionAnswer({
    authedUser: "tylermcginnis",
    qid: newid,
    answer: "optionOne",
  });
  response = await _getQuestions();
  console.log("questions", response);
  console.log(response[newid]["optionOne"]["votes"]);
}
getdata();
