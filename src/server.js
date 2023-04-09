// npx nodemon server.js
var express = require("express");
var app = express();
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("src/avatars"));

app.get("/url", (req, res, next) => {
  res.json(["Ton4y", "Lisa", "Michael", "Ginger", "Food"]);
});
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
