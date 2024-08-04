import { OccupationalHealthcareEntry } from "../../../types";

interface HealthCheckEntryProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryDetail = ({
  entry,
}: HealthCheckEntryProps) => {
  return (
    <>
      <p>Employer: {entry.employerName}</p>
      {entry.sickLeave ? (
        <p>
          Start: {entry.sickLeave.startDate} - End: {entry.sickLeave.endDate}
        </p>
      ) : null}
    </>
  );
};

export default OccupationalHealthcareEntryDetail;
