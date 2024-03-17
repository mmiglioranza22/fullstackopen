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
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
