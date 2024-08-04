import { Router } from "express";
import diagnosesService from "../services/diagnoseService";
import { toNewDiagnoses } from "../utils";

const router = Router();

router.get("/", (_req, res) => {
  const data = diagnosesService.getDiagnoses();
  res.status(200).json(data);
});

router.post("/", (req, res) => {
  try {
    const parsedBody = toNewDiagnoses(req.body);
    const newDiagnosis = diagnosesService.addDiagnosis(parsedBody);
    res.status(201).json(newDiagnosis);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
