import { Router } from "express";
import patientService from "../services/patientService";

const router = Router({ mergeParams: true });

router.post("/:id/entries", (req, res) => {
  try {
    const updatedPatient = patientService.addEntry(
      req.params.id,
      req.body.entry
    );

    res.status(201).json(updatedPatient);
    // res.status(201).json(newDiagnosis);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
