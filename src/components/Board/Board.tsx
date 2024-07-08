import { createElement, useEffect, useState } from "react";
import { generateSquares } from "../../assets/constants/generateSquares";
import { pieces } from "../../assets/constants/pieces";
import "./Board.scss";
import Promote from "../Promote/Promote";
import { checkRules } from "../../assets/constants/rules";
import { Howl } from "howler";
import moveSound from "../../assets/sounds/move.mp3";

const Board = () => {
  const [squares, setSquares] = useState(generateSquares());
  const [prevSquare, setPrevSquare]: any = useState(null);
  const [currentSquare, setCurrentSquare]: any = useState(null);
  const [playerTurn, setPlayerTurn] = useState("white");
  const [isMoveSuccess, setIsMoveSuccess] = useState(false);
  const [isPromote, setIsPromote] = useState(false);
  const [promotePiece, setPromotePiece] = useState("");
  const moveSoundFile = new Howl({
    src: [moveSound],
  });

  const handleSquareClick = (square: any) => {
    if (square.piece?.name !== null && playerTurn == square.piece.color) {
      setPrevSquare(square);
    }

    if (prevSquare && playerTurn !== square.piece.color) {
      let checkValue: any = checkRules(prevSquare, square);

      if (checkValue.result) {
        setCurrentSquare(square);
        setIsMoveSuccess(true);
      }
      if (checkValue.message === "promote") {
        setIsPromote(true);
      }
    }
  };

  useEffect(() => {
    if (isMoveSuccess && !isPromote) {
      moveSoundFile.play();
      setSquares((prevArray) => {
        const prevIndex = squares.indexOf(prevSquare);
        const currentIndex = squares.indexOf(currentSquare);
        prevArray[currentIndex].piece = promotePiece
          ? { ...prevSquare.piece, name: promotePiece }
          : prevSquare.piece;
        prevArray[prevIndex].piece = { name: null, color: "" };
        return prevArray;
      });
      setPlayerTurn(playerTurn == "white" ? "black" : "white");
      setIsMoveSuccess(false);
      setPrevSquare(null);
      setCurrentSquare(null);
      setPromotePiece("");
    }
  }, [isMoveSuccess, isPromote]);

  return (
    <div className="board flexCenter">
      {isPromote && (
        <Promote
          setIsPromote={setIsPromote}
          playerColor={prevSquare && prevSquare.piece?.color}
          setPromotePiece={setPromotePiece}
        />
      )}
      {squares.map((square, i) => (
        <div
          key={i}
          className={`square flexCenter ${square.color} ${
            square.label == prevSquare?.label && "selected-square-bg"
          }`}
          onClick={() => handleSquareClick(square)}
        >
          {square.piece?.name &&
            createElement(pieces[square.piece.name], {
              color: `${square.piece.color}`,
              size: 35,
              style: {
                transform:
                  square.piece.color == "black" ? "rotate(180deg)" : "",
              },
            })}
        </div>
      ))}
    </div>
  );
};

export default Board;
