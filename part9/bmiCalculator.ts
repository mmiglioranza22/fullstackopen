export const calculateBmi = (height: number, weight: number): string => {
  try {
    const index = weight / Math.pow(height / 100, 2);
    if (weight <= 0) {
      throw new Error("Your weight can be 0, how are you kidding? xD");
    }

    let response = "";

    switch (true) {
      case index < 16.0:
        response = "Underweight (Severe thinness)";
        break;
      case index <= 16.9:
        response = "Underweight (Moderate thinness)";
        break;
      case index <= 18.4:
        response = "Underweight (Mild thinness)";
        break;
      case index <= 24.9:
        response = "Normal range";
        break;
      case index <= 29.9:
        response = "Overweight (Pre-obese)";
        break;
      case index <= 34.9:
        response = "Obese (Class I)";
        break;
      case index <= 39.9:
        response = "Obese (Class II)";
        break;
      case index >= 40:
        response = "Obese (Class III)";
        break;
      default:
        throw new Error("Unable to calculate BMI");
    }

    return response;
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
    return "";
  }
};

// const args = process.argv.slice(2).map((el) => Number(el));
// const height = args[0];
// const weight = args[1];
// console.log(calculateBmi(height, weight));
