import { NonSensitiveDiaryEntry } from "../types";

interface DiaryEntriesProps {
  entries: NonSensitiveDiaryEntry[];
}

const DiaryEntries = ({ entries }: DiaryEntriesProps) => {
  return (
    <>
      <h3>Diary entries</h3>
      {entries?.map((entry) => {
        return (
          <div key={entry.id}>
            <h4>{entry.date}</h4>
            <p>visibility: {entry.visibility}</p>
            <p>weather: {entry.weather}</p>
          </div>
        );
      })}
    </>
  );
};

export default DiaryEntries;
