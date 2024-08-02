import axios from "axios";
import { apiBaseUrl } from "../constants";
import { NewDiaryEntry } from "../types";
import toNewDiaryEntry from "../utils";

// https://dev.to/mdmostafizurrahaman/handle-axios-error-in-typescript-4mf9
export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

const getAll = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/diaries`);
  return data;
};

const create = async (object: NewDiaryEntry) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(object);
    const { data } = await axios.post(`${apiBaseUrl}/diaries`, newDiaryEntry);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      console.log(error.status);
      console.error(error.response);
      return { message: error.message, error: error.response };
    } else {
      let errorMessage = "Something went wrong.";
      if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
        console.error(errorMessage);
      }
    }
  }
};

export default {
  getAll,
  create,
};
