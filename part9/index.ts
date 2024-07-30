import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, Result } from "./exerciseCalculator";
import { isNotNumber } from "./utils";

interface Input {
  daily_exercises: number[];
  target: number;
}

const app = express();
app.use(express.json());

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

app.post("/calculate", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target }: Input = req.body;
    if (!daily_exercises || !target) {
      throw new Error("parameters missing");
    }
    if (daily_exercises.some(isNotNumber) || isNotNumber(target)) {
      throw new Error("malformatted parameters");
    }
    const response: Result = calculateExercises(daily_exercises, target);
    res.status(200).json(response);
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
