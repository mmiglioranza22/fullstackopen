import { HealthCheckEntry } from "../../../types";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
}

const HealthCheckEntryDetail = ({ entry }: HealthCheckEntryProps) => {
  return (
    <p>
      {entry.healthCheckRating === 3 ? (
        <MonitorHeartIcon color="error" />
      ) : entry.healthCheckRating === 2 ? (
        <MonitorHeartIcon color="warning" />
      ) : entry.healthCheckRating === 1 ? (
        <MonitorHeartIcon color="primary" />
      ) : (
        <MonitorHeartIcon color="success" />
      )}
    </p>
  );
};

export default HealthCheckEntryDetail;
