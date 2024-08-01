import { CoursePart } from "./types";

interface PartProps {
  course: CoursePart;
}

const assertNeverCheck = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ course }: PartProps) => {
  switch (course.kind) {
    case "basic":
      return (
        <div>
          <h3>BASIC</h3>
          <p>
            <b>
              Name: {course.name} {course.exerciseCount}
            </b>
          </p>
          <p>Description: {course.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>GROUP</h3>
          <p>
            <b>
              Name: {course.name} {course.exerciseCount}
            </b>
          </p>
          <p>Project count: {course.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>BACKGROUND</h3>
          <p>
            <b>
              Name: {course.name} {course.exerciseCount}
            </b>
          </p>
          <p>Description: {course.description}</p>
          <p>Material: {course.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>SPECIAL</h3>
          <p>
            <b>
              Name: {course.name} {course.exerciseCount}
            </b>
          </p>
          <p>Description: {course.description}</p>
          <p>
            Requirements:
            <ul>
              {course.requirements.map((requirement) => (
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
          </p>
        </div>
      );
    default:
      // exhaustive tipe checking : never check
      assertNeverCheck(course);
      return null;
  }
};

export default Part;
