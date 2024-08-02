import { useState } from "react";
import { DiaryEntry, NewDiaryEntry } from "../types";
import entriesService from "../services";

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

  const handleChange = (ev: React.SyntheticEvent) => {
    if (ev.target instanceof HTMLInputElement) {
      setEntry({
        ...entry,
        [ev.target.name]: ev.target.value,
      });
    }
  };

  const handleSubmit = (ev: React.SyntheticEvent): void => {
    ev.preventDefault();
    if (entry) {
      entriesService.create(entry).then((data) => handleNewEntry(data));
    }
  };
  return (
    <div>
      <h1>Add new entry</h1>
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
