import { createElement, useEffect, useState } from "react";
import { generateSquares } from "../../assets/constants/generateSquares";
import { pieces } from "../../assets/constants/pieces";
import "./Board.scss";
import Promote from "../Promote/Promote";
import { checkRules } from "../../assets/constants/rules";
import { Howl } from "howler";
import moveSound from "../../assets/sounds/move.mp3";
import checkMateSound from "../../assets/sounds/win.mp3";
import CheckMate from "../CheckMate/CheckMate";

const Board = () => {
  const [squares, setSquares] = useState(generateSquares());
  const [prevSquare, setPrevSquare]: any = useState(null);
  const [currentSquare, setCurrentSquare]: any = useState(null);
  const [playerTurn, setPlayerTurn] = useState("white");
  const [winner, setWinner] = useState("");
  const [isMoveSuccess, setIsMoveSuccess] = useState(false);
  const [isPromote, setIsPromote] = useState(false);
  const [isWhiteCastling, setIsWhiteCastling] = useState(false);
  const [isBlackCastling, setIsBlackCastling] = useState(false);
  const [isCheckMate, setIsCheckMate] = useState(false);
  const [promotePiece, setPromotePiece] = useState("");
  const moveSoundFile = new Howl({
    src: [moveSound],
  });
  const checkMateSoundFile = new Howl({
    src: [checkMateSound],
  });

  const handleSquareClick = (square: any) => {
    if (square.piece?.name !== null && playerTurn == square.piece.color) {
      setPrevSquare(square);
    }

    if (prevSquare && playerTurn !== square.piece.color) {
      let checkValue: any = checkRules(
        prevSquare,
        square,
        squares,
        isWhiteCastling,
        isBlackCastling
      );

      if (checkValue.result) {
        setCurrentSquare(square);
        setIsMoveSuccess(true);
      }
      checkValue.message === "promote" && setIsPromote(true);
      checkValue.message === "whiteIsCatling" && setIsWhiteCastling(true);
      checkValue.message === "blackIsCatling" && setIsBlackCastling(true);
      checkValue.message === "checkMate" && setIsCheckMate(true);
    }
  };

  /* success move */
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

  /* Check mate */
  useEffect(() => {
    if (isCheckMate) {
      setWinner(playerTurn);
      checkMateSoundFile.play();
    }
  }, [isCheckMate]);

  return (
    <div className="board flexCenter">
      {isCheckMate && <CheckMate player={winner} />}
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
