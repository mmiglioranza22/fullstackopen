import Part from "./Part";
import { CoursePart } from "./types";

interface ContentProps {
  courses: CoursePart[];
}

const Content = ({ courses }: ContentProps) => {
  return courses.map((course, index) => (
    <div key={index}>
      <Part course={course} />
    </div>
  ));
};

export default Content;
