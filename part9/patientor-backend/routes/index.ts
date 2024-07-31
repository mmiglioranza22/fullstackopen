import { Router } from "express";
import diagnosesRouter from "./diagnoses";
import patientsRouter from "./patients";

const router = Router();

router.use("/diagnoses", diagnosesRouter);
router.use("/patients", patientsRouter);

export default router;
