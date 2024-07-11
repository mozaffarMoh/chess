import { useDispatch, useSelector } from "react-redux";
import { decreaseCount, increaseCount } from "../../Slices/returnMovesCount";
import "./ReturnArrows.scss";
import { HiMiniBackward, HiMiniForward } from "react-icons/hi2";
import { RootType } from "../../store";

const ReturnArrows = () => {
  const dispatch = useDispatch();
  const squaresSlice = useSelector((state: RootType) => state.moves.data);
  const returnMovesCount = useSelector(
    (state: RootType) => state.returnMovesCount.value
  );

  const handleIncrease = () => {
    if (returnMovesCount < squaresSlice.length - 1) {
      dispatch(increaseCount());
    }
  };

  const handleDecrease = () => {
    if (returnMovesCount > 0) {
      dispatch(decreaseCount());
    }
  };

  return (
    <div className="return-arrows flexCenter">
      <HiMiniBackward onClick={handleDecrease} />
      <HiMiniForward onClick={handleIncrease} />
    </div>
  );
};

export default ReturnArrows;
