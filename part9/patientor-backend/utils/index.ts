import { Entry, Gender, PatientRequestDTO } from "../types";

export const toNewPatient = (input: unknown): PatientRequestDTO => {
  if (!input || typeof input !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in input &&
    "dateOfBirth" in input &&
    "occupation" in input &&
    "gender" in input &&
    "entries" in input
  ) {
    const newPatient: PatientRequestDTO = {
      name: parseString(input.name),
      dateOfBirth: parseDate(input.dateOfBirth),
      occupation: parseString(input.occupation),
      gender: parseGender(input.gender),
      entries: parseEntries(input.entries),
      ssn: "ssn" in input ? parseString(input.ssn) : undefined,
    };

    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};

// type predicate as return type to ensure specific type is returned
const isString = (data: unknown): data is string => {
  return typeof data === "string" || data instanceof String;
};

// existing edgecase for unix start time 01-01-1970
const isDate = (data: string): boolean => {
  return Boolean(Date.parse(data));
};

const parseString = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect value provided");
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date provided");
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};
// type predicate as return type to ensure specific type is returned
// order of parsing is important, string type is assumed after isString check passes
const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender provided");
  }
  return gender;
};

// type predicate as return type to ensure specific type is returned
const isEntry = (entry: any): entry is Entry => {
  return (
    entry.type === "HealthCheck" ||
    entry.type === "OccupationalHealthcare" ||
    entry.type === "Hospital"
  );
};

const parseEntries = (entries: any): Entry[] => {
  if (!Array.isArray(entries) || !entries.every(isEntry)) {
    throw new Error("Incorrect or missing entries");
  }
  return entries;
};
