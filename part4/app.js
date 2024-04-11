const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const blogRouter = require("./controllers/blogs");
require("./mongoose_db");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/blogs", blogRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === "ValidationError") {
    return res.status(400).send({ message: err.message });
  }
  res.status(500).send("Something broke!");
});

module.exports = app;
