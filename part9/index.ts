import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    if (!req.query.height || !req.query.weight) {
      throw new Error("malformatted parameters");
    }
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);
    console.log(req.query);
    res.status(200).json({
      weight,
      height,
      bmi,
    });
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({
        error: error.message,
      });
    }
  }
});

app.listen(3003, () => {
  console.log("Server listening in port 3003");
});
