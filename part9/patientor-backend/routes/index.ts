import { Router } from "express";
import diagnosesRouter from "./diagnoses"

const router = Router();

router.use("/diagnoses", diagnosesRouter)

export default router;