import { useEffect, useState } from "react";
import { Patient } from "../../types";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";

// interface PatientDetailProps {
//   patient: Patient | undefined;
// }

const PatientDetail = () => {
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

  if (!patient) {
    return <h2>No patient with such id exists</h2>;
  }

  return (
    <div>
      <h3>{patient.name}</h3>
      <p>gender: {patient.gender}</p>
      <p>ssn: {patient.ssn ?? "none"}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientDetail;
