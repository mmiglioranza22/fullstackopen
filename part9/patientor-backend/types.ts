export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth: string;
  entries: Entry[];
}

export type PickedPatient = Pick<
  Patient,
  "id" | "name" | "dateOfBirth" | "occupation" | "gender"
>;

export type PatientRequestDTO = Omit<Patient, "id" | "entries">;
