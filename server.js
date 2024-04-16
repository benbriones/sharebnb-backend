// import app from "./app.js";

// app.listen(3000, function () {
//   console.log(`Started on http://localhost:3000`);
// });

"use strict";

const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});