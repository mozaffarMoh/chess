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
import { useDispatch, useSelector } from "react-redux";
import { RootType } from "../../store";
import { addMoves, startfromThisPoint } from "../../Slices/MovesSlice";
import { increaseCount } from "../../Slices/returnMovesCount";
const Board = () => {
  const dispatch = useDispatch();
  const squaresSlice = useSelector((state: RootType) => state.moves.data);
  const returnMovesCount = useSelector(
    (state: RootType) => state.returnMovesCount.value
  );
  const [squares, setSquares] = useState(generateSquares());
  const [prevSquare, setPrevSquare]: any = useState(null);
  const [currentSquare, setCurrentSquare]: any = useState(null);
  const [playerTurn, setPlayerTurn] = useState("white");
  const [winner, setWinner] = useState("");
  const [isMoveSuccess, setIsMoveSuccess] = useState(false);
  const [isPromote, setIsPromote] = useState(false);
  const [isWhiteCastling, setIsWhiteCastling] = useState(false);
  const [isBlackCastling, setIsBlackCastling] = useState(false);
  const [isCastlingEvent, setIsCastlingEvent] = useState(false);
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
        squaresSlice[returnMovesCount],
        setSquares,
        isWhiteCastling,
        isBlackCastling
      );

      if (checkValue.result) {
        dispatch(startfromThisPoint(returnMovesCount));
        setCurrentSquare(square);
        setIsMoveSuccess(true);
      }

      checkValue.message === "promote" && setIsPromote(true);
      (checkValue.message === "whiteKing" ||
        checkValue.message === "isCastlingEventWhite") &&
        setIsWhiteCastling(true);
      (checkValue.message === "blackKing" ||
        checkValue.message === "isCastlingEventBlack") &&
        setIsBlackCastling(true);
      if (
        checkValue.message === "isCastlingEventWhite" ||
        checkValue.message === "isCastlingEventBlack"
      ) {
        setIsCastlingEvent(true);
      }

      checkValue.message === "checkMate" && setIsCheckMate(true);
    }
  };

  useEffect(() => {
    dispatch(addMoves(squares));
    if (squaresSlice.length > 0) {
      dispatch(increaseCount());
    }
  }, [squares]);

  useEffect(() => {
    if (returnMovesCount >= 0) {
      setPrevSquare(null);
      setCurrentSquare(null);
    }
    returnMovesCount % 2 == 0 && setPlayerTurn("white");
    returnMovesCount % 2 !== 0 && setPlayerTurn("black");
  }, [returnMovesCount]);

  /* success move */
  useEffect(() => {
    if (isMoveSuccess && !isPromote) {
      moveSoundFile.play();

      if (!isCastlingEvent) {
        setSquares(() => {
          const newArray = [...squaresSlice[returnMovesCount]];

          const prevIndex = newArray.indexOf(prevSquare);
          const currentIndex = newArray.indexOf(currentSquare);

          newArray[currentIndex] = {
            ...newArray[currentIndex],
            piece: promotePiece
              ? { ...prevSquare.piece, name: promotePiece }
              : prevSquare.piece,
          };

          newArray[prevIndex] = {
            ...newArray[prevIndex],
            piece: { name: null, color: "" },
          };

          return newArray;
        });
      }
      closeAll();
    }
  }, [isMoveSuccess, isPromote]);

  /* If castling is happen avoid restoring on squares array */
  useEffect(() => {
    if (isCastlingEvent) {
      closeAll();
    }
  }, [isCastlingEvent]);

  /* Close All */
  const closeAll = () => {
    setIsCastlingEvent(false);
    setIsMoveSuccess(false);
    setPrevSquare(null);
    setCurrentSquare(null);
    setPromotePiece("");
  };

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
      {squaresSlice[returnMovesCount] &&
        squaresSlice[returnMovesCount].map((square: any, i: number) => (
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
