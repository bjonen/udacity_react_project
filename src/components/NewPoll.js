import { useState } from "react";

const NewPoll = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setText1("");
    setText2("");
    // Perform submission logic
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
                name="text2"
                type="text"
                value={text2}
                onChange={handleChange}
              />
            </label>
            <br />
            <button className="abc" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPoll;
