import { Router } from "express";
import patientService from "../services/patientService";

const router = Router();

router.get("/", (_req, res) => {
  const data = patientService.getPatients();
  res.status(200).json(data);
});

export default router;
