import { render, fireEvent } from "@testing-library/react";
import { _saveQuestion, _saveQuestionAnswer } from "./api/_DATA.js";

describe("_saveQuestion", () => {
  it("will return a correclty formatted question", async () => {
    var question = {
      optionOneText: "test option one",
      optionTwoText: "test option two",
      author: "sarahedo",
    };
    var formattedQuestion = await _saveQuestion(question);
    console.log(formattedQuestion);
    expect(formattedQuestion.author).toEqual(question.author);
    expect(formattedQuestion.optionOne.text).toEqual(question.optionOneText);
    expect(formattedQuestion.optionTwo.text).toEqual(question.optionTwoText);
  });

  it("will return an error ", async () => {
    var question = {
      optionOneText: "test option one",
      author: "sarahedo",
    };
    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("will return a correclty formatted question", async () => {
    var answer = {
      authedUser: "sarahedo",
      qid: "vthrdm985a262al8qx3do",
      answer: "optionOne",
    };
    var res = await _saveQuestionAnswer(answer);
    console.log(res);
    expect(res).toEqual(true);
  });

  it("will return an error ", async () => {
    var answer = {
      authedUser: "sarahedo",
      qid: "vthrdm985a262al8qx3do",
    };
    await expect(_saveQuestionAnswer(answer)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
