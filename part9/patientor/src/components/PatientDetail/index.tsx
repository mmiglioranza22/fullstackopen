import { useEffect, useMemo, useState } from "react";
import { Diagnosis, Patient } from "../../types";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";

interface PatientDetailProps {
  diagnoses: Diagnosis[];
}

const PatientDetail = ({ diagnoses }: PatientDetailProps) => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const { id: patientId } = useParams();

  useEffect(() => {
    if (patientId) {
      const fetchPatientById = async () => {
        const patient = await patientService.getById(patientId);
        setPatient(patient);
      };
      void fetchPatientById();
    }

    return () => setPatient(undefined);
  }, [patientId]);

  const entries = useMemo(() => {
    return patient?.entries.length
      ? patient.entries.map((entry) => {
          let entryType = null;
          const baseEntry = (
            <div>
              <p>
                {entry.date} {entry.description}
              </p>
              <p>Specialist: {entry.specialist}</p>
              {entry.diagnosisCodes?.length ? (
                <p>
                  Code :
                  <ul>
                    {entry.diagnosisCodes?.map((code) => {
                      const diagnosisDetail = diagnoses.find(
                        (d) => d.code === code
                      );

                      return (
                        <li>
                          {code} : {diagnosisDetail?.name} -{" "}
                          {diagnosisDetail?.latin}
                        </li>
                      );
                    })}
                  </ul>
                </p>
              ) : null}
              {entryType}
            </div>
          );

          switch (entry.type) {
            case "HealthCheck":
              entryType = (
                <p>{Object.keys(entry.healthCheckRating).toString()}</p>
              );
              break;
            case "Hospital":
              entryType = (
                <p>
                  Discharge: {entry.discharge.date} - {entry.discharge.criteria}
                </p>
              );
              break;
            case "OccupationalHealthcare":
              entryType = (
                <>
                  <p>Employer: {entry.employerName}</p>
                  {entry.sickLeave ? (
                    <p>
                      Start: {entry.sickLeave.startDate} - End:{" "}
                      {entry.sickLeave.endDate}
                    </p>
                  ) : null}
                </>
              );
              break;
            default:
              break;
          }
          return baseEntry;
        })
      : null;
  }, [patient?.entries]);

  if (!patient) {
    return <h2>No patient with such id exists</h2>;
  }

  return (
    <div>
      <h3>{patient.name}</h3>
      <p>gender: {patient.gender}</p>
      <p>ssn: {patient.ssn ?? "none"}</p>
      <p>occupation: {patient.occupation}</p>
      {entries ? (
        <>
          <h4>entries</h4>
          {entries}
        </>
      ) : null}
    </div>
  );
};

export default PatientDetail;
