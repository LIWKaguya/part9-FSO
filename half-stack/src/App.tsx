import React from 'react';
interface header {
  courseName: string;
}

interface coursePart {
  name: string;
  exerciseCount: number;
}

const Header = (props: header) => {
  return <h1>{props.courseName}</h1>
}

const Course = (props: coursePart) => {
  return (
    <p>{props.name} {props.exerciseCount}</p>
  )
}

const Courses = ({courseParts}: {courseParts: coursePart[]}) => {
  return (
    <>
    {courseParts.map(course => <Course key={course.name} name={course.name} exerciseCount={course.exerciseCount} /> )}
    </>
  )
}

const Total = ({courseParts}: {courseParts: coursePart[]}) => {
  return (
    <>
    <p>Number of exercises {" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
    </>
  )
}

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Courses courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;