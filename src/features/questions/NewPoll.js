// State:
// internal: text1, text2
// external:
// * authedUser (To save the question to the user's list of questions),
// * questions (to check whether the question already exists and to save the new questions)

import { useState } from "react";
import Button from "@mui/material/Button";
import { useSaveQuestionMutation } from "./questionSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewPoll = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [saveQuestion, { isLoading }] = useSaveQuestionMutation();
  const authedUser = useSelector((state) => state.authedUser.id);
  const navigate = useNavigate();
  if (authedUser === "anonymous") {
    return (
      <div style={{ padding: "10px" }}>
        Please log in using dropdown on the top right
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setText1("");
    setText2("");
    // Perform submission logic
    saveQuestion({
      optionOneText: text1,
      optionTwoText: text2,
      author: authedUser,
    });
    navigate("/");
  };

  const handleChange = (e) => {
    const text = e.target.value;
    const name = e.target.name;
    if (name === "text1") {
      setText1(text);
    } else {
      setText2(text);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div data-testid="api-loading">Waiting for API request to complete</div>
      ) : (
        <div
          style={{
            // https://stackoverflow.com/a/33049392
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            //alignSelf: "center",
            alignItems: "center",
          }}
        >
          <div>
            <h1>Create New Poll</h1>
            <span>Would You Rather</span>
            <br />
            <div>
              <form onSubmit={handleSubmit}>
                <label>
                  Option A
                  <input
                    style={{ marginLeft: "10px" }}
                    data-testid="text1"
                    name="text1"
                    type="text"
                    value={text1}
                    onChange={handleChange}
                  />
                </label>
                <br />
                <label>
                  Option B
                  <input
                    style={{ marginLeft: "10px" }}
                    data-testid="text2"
                    name="text2"
                    type="text"
                    value={text2}
                    onChange={handleChange}
                  />
                </label>
                <br />
                <Button
                  id="submitNewPoll"
                  data-testid="submit-button"
                  type="submit"
                  variant="outlined"
                  style={{ height: "10%", width: "10%" }}
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPoll;
