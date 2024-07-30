type Rating =
  | "not too bad but could be better"
  | "perfect"
  | "you didn't even try, you need to work out more";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: Rating;
  target: number;
  average: number;
}

const rating = () => {};
const calculateExercises = (days: number[], target: number): Result => {
  const rating =
    days.filter((day) => day >= target).length >= 3
      ? 3
      : days.filter((day) => day > 0).length >= 2
      ? 2
      : 1;

  const ratingDescription =
    rating >= 3
      ? "perfect"
      : rating >= 2
      ? "not too bad but could be better"
      : "you didn't even try, you need to work out more";

  const result: Result = {
    periodLength: days.length,
    trainingDays: days.filter((day) => day > 0).length,
    success: days.every((day) => day > target),
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: days.reduce((acc, cur) => acc + cur) / days.length,
  };

  return result;
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
