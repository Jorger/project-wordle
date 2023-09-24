import { range } from "../../utils";

const Cell = ({ word = {} }) => {
  const { guess = [] } = word;
  return <p className="guess">
    {
      range(5).map(index => {
        const value = guess?.[index]?.letter || "";
        const className = `cell ${guess?.[index]?.status || ""}`;

        return <span key={index} className={className}>{value}</span>
      })
    }
  </p>
}


const Grid = ({ words }) => {
  return <div className="guess-results">
    {
      range(6).map(index => {
        return <Cell key={index} word={words?.[index] || {}} />
      })
    }
  </div>
}

export default Grid;
