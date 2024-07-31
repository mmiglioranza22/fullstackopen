import { Gender, PickedPatient } from "../types";
import data from "../data/patients";

const getPatients = (): PickedPatient[] => {
  const patients = data.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender: gender as Gender,
      occupation,
    };
  });
  return patients;
};

export default { getPatients };
