import { v1 as uuid } from "uuid";
import { Patient, PatientRequestDTO } from "../types";
import data from "../data/patients";
import { toNewPatient } from "../utils";

// existing data not normalized for gender enum needs to be mapped
const patientEntries: Patient[] = data.map((obj) => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getPatients = (): PatientRequestDTO[] => {
  const patients = patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => {
      return {
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
      };
    }
  );
  return patients;
};

const getPatientById = (id: string): Patient | null => {
  const patient = patientEntries.find((patient) => patient.id === id) ?? null;
  return patient;
};

const addPatient = (input: PatientRequestDTO): Patient => {
  const patient: Patient = {
    id: uuid(),
    ...input,
  };
  patientEntries.push(patient);
  return patient;
};

export default { getPatients, addPatient, getPatientById };
