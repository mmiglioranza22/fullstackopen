import { Router } from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils";

const router = Router();

router.get("/", (_req, res) => {
  const data = patientService.getPatients();
  res.status(200).json(data);
});

router.post("/", (req, res) => {
  try {
    const parsedBody = toNewPatient(req.body);
    const newPatient = patientService.addPatient(parsedBody);
    res.status(201).json(newPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
