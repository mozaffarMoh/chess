import { createElement, useEffect, useState } from "react";
import { generateSquares } from "../../assets/constants/generateSquares";
import { pieces } from "../../assets/constants/pieces";
import "./Board.scss";

const Board = () => {
  const [squares, setSquares] = useState(generateSquares());
  const [prevSquare, setPrevSquare]: any = useState(null);
  const [currentSquare, setCurrentSquare]: any = useState(null);
  const [playerTurn, setPlayerTurn] = useState("white");
  const [isMoveSuccess, setIsMoveSuccess] = useState(false);

  const handleSquareClick = (square: any) => {
    if (
      !prevSquare &&
      square.piece?.name !== null &&
      playerTurn == square.piece.color
    ) {
      setPrevSquare(square);
    }

    if (prevSquare) {
      setCurrentSquare(square);
      setIsMoveSuccess(true);
    }
  };

  useEffect(() => {
    if (isMoveSuccess) {
      setSquares((prevArray) => {
        const prevIndex = squares.indexOf(prevSquare);
        const currentIndex = squares.indexOf(currentSquare);
        prevArray[currentIndex].piece = prevSquare.piece;
        prevArray[prevIndex].piece = { name: null, color: "" };
        return prevArray;
      });
      setPlayerTurn(playerTurn == "white" ? "black" : "white");
      setIsMoveSuccess(false);
      setPrevSquare(null);
      setCurrentSquare(null);
    }
  }, [isMoveSuccess]);

  return (
    <div className="board flexCenter">
      <div className="numbers"></div>

      {squares.map((square, i) => (
        <div
          key={i}
          className={`square flexCenter ${square.color} ${
            square.label == currentSquare?.label && "selected-square-bg"
          }`}
          onClick={() => handleSquareClick(square)}
        >
          {square.piece?.name &&
            createElement(pieces[square.piece.name], {
              color: `${square.piece.color}`,
              size: 35,
            })}
        </div>
      ))}
    </div>
  );
};

export default Board;
