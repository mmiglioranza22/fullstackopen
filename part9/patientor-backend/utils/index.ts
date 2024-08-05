import {
  Diagnosis,
  Entry,
  EntryRequestDTO,
  Gender,
  PatientRequestDTO,
} from "../types";

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

export const toNewDiagnoses = (input: unknown): Diagnosis => {
  if (!input || typeof input !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("name" in input && "code" in input) {
    const newDiagnosis: Diagnosis = {
      name: parseString(input.name),
      code: parseString(input.code),
      latin: "latin" in input ? parseString(input.latin) : undefined,
    };

    return newDiagnosis;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntry = (input: unknown): EntryRequestDTO => {
  console.log({ input });
  if (!input || typeof input !== "object") {
    throw new Error("Incorrect or missing data");
  }
  let baseEntry;
  if (
    "description" in input &&
    "date" in input &&
    "specialist" in input &&
    "type" in input
  ) {
    baseEntry = {
      ...input,
      description: parseString(input.description),
      date: parseDate(input.date),
      specialist: parseString(input.specialist),
      diagnosisCodes:
        "diagnosisCodes" in input
          ? parseDiagnosisCodes(input.diagnosisCodes)
          : undefined,
    };

    return baseEntry as EntryRequestDTO;
  }
  throw new Error("Incorrect data: some fields are missing");
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
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
