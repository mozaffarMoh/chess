import "./App.scss";
import Board from "./components/Board/Board";
import LabelsColumn from "./components/labelsColumn/labelsColumn";
import LabelsRow from "./components/labelsRow/labelsRow";

function App() {
  return (
    <div className="app flexCenter">
      <LabelsRow />
      <div className="flexCenterColumn">
        <LabelsColumn />
        <Board />
        <LabelsColumn />
      </div>
      <LabelsRow />
    </div>
  );
}

export default App;
