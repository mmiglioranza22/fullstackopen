import { useState } from "react";
import { DiaryEntry, NewDiaryEntry } from "../types";
import entriesService, { ValidationError } from "../services";
import { isString, isVisibility, isWeather } from "../utils";
import axios from "axios";

interface DiaryEntryFormProps {
  handleNewEntry: (entry: DiaryEntry) => void;
}

const DiaryEntryForm = ({ handleNewEntry }: DiaryEntryFormProps) => {
  // const [entryDate, setEntryDate] = useState<string>("");
  // const [entryVisibility, setEntryVisibility] = useState<string>("");
  // const [entryWeather, setEntryWeather] = useState<string>("");
  // const [entryComment, setEntryComment] = useState<string>("");
  const [entry, setEntry] = useState<NewDiaryEntry | undefined>({
    date: "",
    visibility: undefined,
    weather: undefined,
    comment: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (ev: React.SyntheticEvent) => {
    if (ev.target instanceof HTMLInputElement) {
      // not the best error handling
      switch (ev.target.name) {
        case "date":
          // this will always be string, validation should be different
          !isString(ev.target.value)
            ? setError("Error: Incorrect date: " + ev.target.value)
            : setError(null);
          break;
        case "comment":
          !isString(ev.target.value)
            ? setError("Error: Incorrect comment: " + ev.target.value)
            : setError(null);
          break;
        case "weather":
          !isWeather(ev.target.value)
            ? setError("Error: Incorrect weather: " + ev.target.value)
            : setError(null);
          break;
        case "visibility":
          !isVisibility(ev.target.value)
            ? setError("Error: Incorrect visibility: " + ev.target.value)
            : setError(null);
          break;
        default:
          // exhaustive tipe checking needs refactor of all switch, not used for now
          return null;
      }
      // this gets set nonetheless it will not trigger the service post
      setEntry({
        ...entry,
        [ev.target.name]: ev.target.value,
      });
    }
  };

  const handleSubmit = (ev: React.SyntheticEvent): void => {
    ev.preventDefault();
    // service will trigger if no values are sent (error initial state is null)
    if (entry && !error) {
      entriesService
        .create(entry)
        .then((data) => data && handleNewEntry(data))
        .catch((error) => {
          if (
            axios.isAxiosError<ValidationError, Record<string, unknown>>(error)
          ) {
            setError(error.message);
          } else {
            return null;
          }
        });
    }
  };

  return (
    <div>
      <h1>Add new entry</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <p>
          <label>date</label>
          <input
            type="text"
            value={entry?.date}
            onChange={handleChange}
            // onChange={(ev) => setEntryDate(ev.target.value)}
            name="date"
          />
        </p>
        <p>
          <label>visibility</label>
          <input
            type="text"
            value={entry?.visibility}
            // value={entryVisibility}
            onChange={handleChange}
            // onChange={(ev) => setEntryVisibility(ev.target.value)}
            name="visibility"
          />
        </p>
        <p>
          <label>weather</label>
          <input
            type="text"
            value={entry?.weather}
            // value={entryWeather}
            onChange={handleChange}
            // onChange={(ev) => setEntryWeather(ev.target.value)}
            name="weather"
          />
        </p>
        <p>
          <label>comment</label>
          <input
            type="text"
            value={entry?.comment}
            // value={entryComment}
            onChange={handleChange}
            // onChange={(ev) => setEntryComment(ev.target.value)}
            name="comment"
          />
        </p>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryEntryForm;
