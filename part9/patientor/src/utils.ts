import { Entry } from "./types";

// type predicate as return type to ensure specific type is returned
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEntry = (entry: any): entry is Entry => {
  return (
    entry.type === "HealthCheck" ||
    entry.type === "OccupationalHealthcare" ||
    entry.type === "Hospital"
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseEntries = (entries: any): Entry[] => {
  if (!Array.isArray(entries) || !entries.every(isEntry)) {
    throw new Error("Incorrect or missing entries");
  }
  return entries;
};
