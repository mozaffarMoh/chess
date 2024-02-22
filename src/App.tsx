import "./App.scss";
import Car from "./components/Car/Car";
import bgGrey from "./assets/Images/bgGrey.png";
import indicator from "./assets/Images/indicators.png";

function App() {
  const indicatorsArray = Array(6).fill(indicator);
  return (
    <div
      className="app flexCenter"
      style={{ backgroundImage: `url(${bgGrey})` }}
    >
      <Car />
      <div className="indicators flexCenter">
        {indicatorsArray.map((item, i) => {
          return (
            <div className={`indicator indicator${i} flexCenter`} key={i}>
              {" "}
              <img src={item} />{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
