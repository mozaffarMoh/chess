import { createElement } from "react";
import { generateSquares } from "../../assets/constants/generateSquares";
import { pieces } from "../../assets/constants/pieces";
import "./Board.scss";

const Board = () => {
  const squares = generateSquares();

  return (
    <div className="board flexCenter">
      <div className="numbers"></div>

      {squares.map((square, i) => (
        <div key={i} className={`square flexCenter ${square.colorGrade}`}>
          {square.piece &&
            createElement(pieces[square.piece], {
              color: `${
                square.label.includes("7") || square.label.includes("8")
                  ? "black"
                  : "#ffffee"
              }`,
              size: 35,
            })}
        </div>
      ))}
    </div>
  );
};

export default Board;
