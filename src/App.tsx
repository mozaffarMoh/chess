import "./App.scss";
import Car from "./components/Car/Car";
import indicator from "./assets/Images/indicators.png";
import React from "react";
import { WiDaySunnyOvercast } from "react-icons/wi";
import { IoCloudyNightSharp } from "react-icons/io5";
import { GiNightSleep } from "react-icons/gi";
import { useSpring, animated } from "@react-spring/web";

function App() {
  const indicatorsArray = Array(60).fill(indicator);
  const [counter, setCounter]: any = React.useState(0);
  const [stopGame, setStopGame]: any = React.useState(false);

  /* Change background based on counter */
  const changeBackground = () => {
    if (counter < 10) {
      return "grey";
    }
    if (counter >= 10 && counter < 20) {
      return "#4b4b7a";
    }
    if (counter >= 20 && counter <= 30) {
      return "#393636";
    }
  };

  /* Change indicators speed */
  const indicatorsSpeed = () => {
    if (counter < 10) {
      return 11000;
    }
    if (counter >= 10 && counter < 20) {
      return 8000;
    }
    if (counter >= 20 && counter <= 30) {
      return 5000;
    }
  };

  const indicatorStyles: any = useSpring({
    from: {
      position: "relative",
      top: "1000px",
    },
    to: {
      top: "-7000px",
    },
    config: { duration: indicatorsSpeed() },
    loop: true,
    pause: stopGame,
  });

  return (
    <div
      className="app flexCenter"
      style={{ backgroundColor: changeBackground() }}
    >
      <div className="daytime-image">
        {counter < 10 && <WiDaySunnyOvercast size={60} color="yellow" />}
        {counter >= 10 && counter < 20 && (
          <IoCloudyNightSharp size={50} color="#d5c1c1" />
        )}
        {counter >= 20 && counter <= 30 && (
          <GiNightSleep size={50} color="darkblue" />
        )}
      </div>

      <Car setCounterProp={setCounter} setStopGameProp={setStopGame} />
      <div className="indicators flexCenter">
        {indicatorsArray.map((item, i) => {
          return (
            <animated.div
              style={indicatorStyles}
              className={`indicator indicator${i} flexCenter`}
              key={i}
            >
              <img src={item} />
            </animated.div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
