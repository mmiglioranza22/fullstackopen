export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {}

export enum Gender {
  Male = "male",
  Female = "female",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export type PickedPatient = Pick<
  Patient,
  "id" | "name" | "dateOfBirth" | "occupation" | "gender"
>;
