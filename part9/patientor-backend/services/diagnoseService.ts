import { Diagnosis } from "../types";
import data from "../data/diagnoses";

const getDiagnoses = (): Diagnosis[] => {
  return data;
};

const addDiagnosis = (diagnosis: Diagnosis): Diagnosis => {
  const existingDiagnosisIndex = data.findIndex(
    (diag) => diag.code === diagnosis.code
  );
  if (existingDiagnosisIndex > -1) {
    data[existingDiagnosisIndex].name = diagnosis.name;
    data[existingDiagnosisIndex].latin = diagnosis.latin;
    return data[existingDiagnosisIndex];
  } else {
    data.push(diagnosis);
    return diagnosis;
  }
};

export default { getDiagnoses, addDiagnosis };
