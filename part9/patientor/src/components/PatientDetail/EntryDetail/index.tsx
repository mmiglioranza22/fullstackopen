import { Diagnosis, Entry } from "../../../types";
import { assertNeverCheck } from "../../../utils";
import HealthCheckEntryDetail from "./HealthCheckEntryDetail";
import HospitalEntryDetail from "./HospitalEntryDetail";
import OccupationalHealthcareEntryDetail from "./OccupationalHealthcareEntryDetail";

interface EntryDetailsProps {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const EntryDetail = ({ entries, diagnoses }: EntryDetailsProps) => {
  return entries.map((entry) => {
    let entryType = null;
    switch (entry.type) {
      case "HealthCheck":
        entryType = <HealthCheckEntryDetail entry={entry} />;
        break;
      case "Hospital":
        entryType = <HospitalEntryDetail entry={entry} />;
        break;
      case "OccupationalHealthcare":
        entryType = <OccupationalHealthcareEntryDetail entry={entry} />;
        break;
      default:
        assertNeverCheck(entry);
    }
    const baseEntry = (
      <div
        key={entry.id}
        style={{
          border: "1px solid black",
          borderRadius: "8px",
          padding: "8px",
          margin: "5px auto",
        }}
      >
        <p>
          {entry.date} - {entry.type}
        </p>
        <p>{entry.description}</p>
        {entryType}
        {entry.diagnosisCodes?.length ? (
          <p>
            Code :
            <ul>
              {entry.diagnosisCodes?.map((code) => {
                const diagnosisDetail = diagnoses.find((d) => d.code === code);

                return (
                  <li>
                    {code} : {diagnosisDetail?.name} - {diagnosisDetail?.latin}
                  </li>
                );
              })}
            </ul>
          </p>
        ) : null}
        <p>diagnose by: {entry.specialist}</p>
      </div>
    );
    return baseEntry;
  });
};

export default EntryDetail;
