import "./App.scss";
import Board from "./components/Board/Board";

function App() {
  return (
    <div className="app flexCenterColumn">
      <h1>Chess</h1>
      <Board />
    </div>
  );
}

export default App;