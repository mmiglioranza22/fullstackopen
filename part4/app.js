const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const blogRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
require("./mongoose_db");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === "ValidationError") {
    return res.status(400).send({ message: err.message });
  } else if (err.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  } else if (
    err.name === "MongoServerError" &&
    err.message.includes("E11000 duplicate key error")
  ) {
    return res.status(400).json({ error: "expected `username` to be unique" });
  } else {
    res.status(500).send("Something broke!");
  }
});

module.exports = app;
