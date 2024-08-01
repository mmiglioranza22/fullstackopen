import { Courses } from "./types";

interface ContentProps {
  courses: Courses[];
}

const Content = ({ courses }: ContentProps) => {
  return courses.map(({ name, exerciseCount }) => (
    <p>
      {name} {exerciseCount}
    </p>
  ));
};

export default Content;
