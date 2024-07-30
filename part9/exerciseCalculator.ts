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

const args = process.argv.slice(2).map((el) => Number(el));
const target = args[0];
const days = args.slice(1, args.length);

console.log(calculateExercises(days, target));
