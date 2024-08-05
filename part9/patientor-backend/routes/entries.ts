import { Router } from "express";
import patientService from "../services/patientService";
import { toNewEntry } from "../utils";

const router = Router({ mergeParams: true });

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body.entry);
    const updatedPatient = patientService.addEntry(req.params.id, newEntry);
    res.status(201).json(updatedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
