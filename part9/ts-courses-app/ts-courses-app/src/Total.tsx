interface TotalProps {
  total: number;
}

const Total = ({ total }: TotalProps) => {
  return <p>Number of excercises: {total}</p>;
};

export default Total;
