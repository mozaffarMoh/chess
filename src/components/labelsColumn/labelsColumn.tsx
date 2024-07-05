import { labelsColumnArray } from "../../assets/constants/generateSquares";
import "./labelsColumn.scss";
const LabelsColumn = () => {
  return (
    <div className="labels-column-container flexCenter">
      {labelsColumnArray.map((item, i) => (
        <div key={i} className={`label-column flexCenter`}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default LabelsColumn;
