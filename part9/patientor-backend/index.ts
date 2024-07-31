import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;
app.use("/api", router);

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
