import { createElement, useEffect, useState } from "react";
import { generateSquares } from "../../assets/constants/generateSquares";
import { pieces } from "../../assets/constants/pieces";
import "./Board.scss";
import { pawnRule } from "../../assets/constants/rules";
import Promote from "../Promote/Promote";

const Board = () => {
  const [squares, setSquares] = useState(generateSquares());
  const [prevSquare, setPrevSquare]: any = useState(null);
  const [currentSquare, setCurrentSquare]: any = useState(null);
  const [playerTurn, setPlayerTurn] = useState("white");
  const [isMoveSuccess, setIsMoveSuccess] = useState(false);
  const [isPromote, setIsPromote] = useState(false);
  const [promotePiece, setPromotePiece] = useState("");

  const handleSquareClick = (square: any) => {
    if (square.piece?.name !== null && playerTurn == square.piece.color) {
      setPrevSquare(square);
    }

    if (prevSquare && playerTurn !== square.piece.color) {
      const checkRule: any = () => {
        switch (prevSquare.piece?.name) {
          case "pawn":
            return pawnRule(prevSquare, square);
          case "rook":
            console.log("rook");
            break;
          case "knight":
            console.log("knight");
            break;
          case "bishop":
            console.log("bishop");
            break;
          case "queen":
            console.log("queen");
            break;
          case "king":
            console.log("king");
            break;
          default:
            break;
        }
      };

      if (checkRule()) {
        setCurrentSquare(square);
        setIsMoveSuccess(true);
      }
      if (checkRule().message === "promote") {
        setIsPromote(true);
      }
    }
  };

  useEffect(() => {
    if (isMoveSuccess && !isPromote) {
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
            })}
        </div>
      ))}
    </div>
  );
};

export default Board;
