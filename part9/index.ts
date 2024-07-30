import express from "express";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.listen(4000, () => {
  console.log("Server listening in port 4000");
});
