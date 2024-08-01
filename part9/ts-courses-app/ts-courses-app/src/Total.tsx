interface TotalProps {
  total: number;
}

const Total = ({ total }: TotalProps) => {
  return <p>{total}</p>;
};

export default Total;
