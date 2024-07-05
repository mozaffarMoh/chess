import "./labelsRow.scss";
import { labelsRowArray } from "../../assets/constants/generateSquares";

const LabelsRow = () => {
  return (
    <div className="labels-row-container">
      {labelsRowArray.map((item, i) => (
        <div key={i} className={`label-row flexCenter`}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default LabelsRow;
