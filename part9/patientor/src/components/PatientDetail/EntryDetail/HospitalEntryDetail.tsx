import { HospitalEntry } from "../../../types";

interface HealthCheckEntryProps {
  entry: HospitalEntry;
}

const HospitalEntryDetail = ({ entry }: HealthCheckEntryProps) => {
  return (
    <p>
      Discharge: {entry.discharge.date} - {entry.discharge.criteria}
    </p>
  );
};

export default HospitalEntryDetail;
