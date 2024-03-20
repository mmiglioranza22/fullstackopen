const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map((part, index) => {
        return <Part key={index} part={part.name} exercises={part.exercises} />;
      })}
    </div>
  );
};

const Total = (props) => {
  const total = props.course.parts.reduce(
    (acc, part) => acc + part.exercises,
    0
  );
  return <p style={{ fontWeight: 700 }}>total of {total} exercises</p>;
};

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => {
        return (
          <>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
          </>
        );
      })}
    </div>
  );
};

export default Courses;
