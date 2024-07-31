import { Router } from "express";
import diagnosesService from "../services/diagnoseService";

const router = Router();

router.get("/", (_req, res) => {
  const data = diagnosesService.getDiagnoses();
  res.status(200).json(data);
});

export default router;
