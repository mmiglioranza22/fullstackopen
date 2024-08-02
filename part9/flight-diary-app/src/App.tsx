import { useEffect, useState } from "react";
import DiaryEntryForm from "./components/DiaryEntryForm";
import DiaryEntries from "./components/DiaryEntries";
import entriesService from "./services";
import { DiaryEntry, NonSensitiveDiaryEntry } from "./types";

const App = () => {
  // This would be handled all in the list component
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  useEffect(() => {
    entriesService.getAll().then((data) => setEntries(data));
  }, []);

  // Ideally this would be handled all in the form component via dispatch actions to store with the return value of the post service
  // or via query invalidation and automatic refetch (react query, graphql)
  // This is a hack for simplification
  const handleNewEntry = (newEntry: DiaryEntry) => {
    // console.log(newEntry);
    if (entries.findIndex((e) => e.id === newEntry.id) === -1) {
      setEntries([...entries, newEntry]);
    }
  };
  return (
    <>
      <DiaryEntryForm handleNewEntry={handleNewEntry} />
      <DiaryEntries entries={entries} />
    </>
  );
};

export default App;
