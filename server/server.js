const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
//
dotenv.config();
require('./db/db')
const PORT = process.env.PORT || 4000;
const app = express();
//
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log("query", req.query);
  console.log("params", req.params);
  console.log("body", req.body);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
