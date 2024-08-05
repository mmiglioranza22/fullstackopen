import { Router } from "express";
import entriesRouter from "./entries";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils";

const router = Router();
// This was done because typescript did not reconized parent router's param from withing child router
// check commentsRouter part7 dir
router.use("/", entriesRouter);

router.get("/", (_req, res) => {
  const data = patientService.getPatients();
  res.status(200).json(data);
});

router.get("/:id", (req, res) => {
  const data = patientService.getPatientById(req.params.id);
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
