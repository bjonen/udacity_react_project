import { useState } from "react";

const NewPoll = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange1 = (e) => {
    const text = e.target.value;

    setText1(text);
  };

  const handleChange2 = (e) => {
    const text = e.target.value;

    setText2(text);
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
          <form>
            <label>
              Option A
              <input
                style={{ marginLeft: "10px" }}
                name="a"
                type="text"
                value={text1}
                onChange={handleChange1}
              />
            </label>
            <br />
            <label>
              Option B
              <input
                style={{ marginLeft: "10px" }}
                name="b"
                type="text"
                value={text2}
                onChange={handleChange1}
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
