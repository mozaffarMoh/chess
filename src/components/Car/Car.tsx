import "./Car.scss";
import myCar from "../../assets/Images/myCar.png";
import car1 from "../../assets/Images/car1.png";
import car2 from "../../assets/Images/car2.png";
import car3 from "../../assets/Images/car3.png";
import car4 from "../../assets/Images/car4.png";
import { useSpring, animated } from "@react-spring/web";
import React from "react";

const Car = ({ setCounterProp, setStopGameProp }: any) => {
  const calcRandom = () => {
    return Math.random() * window.innerWidth - 50;
  };
  const topScore = localStorage.getItem("topScore");
  const [carPositions, setCarPositions] = React.useState([]);
  const otherCarsRefs: any = React.useRef([]);
  const [myCarPosition, setMyCarPosition]: any = React.useState(50);
  const [randomValue, setRandomValue]: any = React.useState();
  const [stopGame, setStopGame]: any = React.useState(false);
  const [counter, setCounter]: any = React.useState(0);

  /* Increase counter */
  React.useEffect(() => {
    if (!stopGame) {
      setTimeout(() => {
        setInterval(
          setCounter((prev: any) => prev + 1),
          1000
        );
        setCounterProp(counter);
        if (counter === 29) {
          setStopGame(true);
          setStopGameProp(true);
        }
      }, 1000);
    } else {
      clearInterval(0);
    }
  }, [counter]);

  const carsArray = [
    { image: car1, className: "other-car car1" },
    { image: car2, className: "other-car car2" },
    { image: car3, className: "other-car car3" },
    { image: car4, className: "other-car car4" },
  ];

  /* Handle Speed based on counter */
  const handleSpeed = () => {
    if (counter < 10) {
      return 2000;
    } else if (counter >= 10 && counter < 20) {
      return 1000;
    } else {
      return 500;
    }
  };
  /* Animations for Other Cars */
  const otherCarsStyles: any = carsArray.map((_, index) => {
    let speed = index * 100 + handleSpeed();

    return useSpring({
      from: {
        position: "absolute",
        zIndex: 30,
        top: "-100px",
        left: randomValue ? randomValue : calcRandom(),
      },
      to: { top: "650px" },
      config: { duration: speed },
      pause: stopGame,
      onRest: () => setRandomValue(calcRandom()),
      loop: true,
    });
  });

  /* Change position of myCar by arrows */
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!stopGame) {
        if (event.key === "ArrowRight") {
          setMyCarPosition((prev: any) => prev + 10);
        } else if (event.key === "ArrowLeft") {
          setMyCarPosition((prev: any) => prev - 10);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [stopGame]);

  /* store positions in a states */
  React.useEffect(() => {
    const positions = otherCarsRefs.current.map((ref: any) => {
      const style = ref.style;
      return {
        x: Number(style.left.slice(0, -2)),
        y: Number(style.top.slice(0, -2)),
      };
    });
    setCarPositions(positions);
  }, [otherCarsRefs, myCarPosition]);

  /* Check cars collision */
  React.useEffect(() => {
    const isCollision = carPositions.some((car: any) => {
      return (
        car.y > 400 && car.y < 600 && Math.abs(car.x - myCarPosition) <= 80
      );
    });

    if (isCollision) {
      setStopGame(true);
      setStopGameProp(true);
      if (!topScore) {
        localStorage.setItem("topScore", counter);
      } else {
        if (counter > topScore) {
          localStorage.setItem("topScore", counter);
        }
      }
    }
  }, [otherCarsRefs.current?.style?.top, carPositions, myCarPosition]);

  return (
    <div className="car">
      {stopGame && (
        <div className="stop-game-message flexCenterColumn">
          {counter === 30 ? <h1>Congratulations :)</h1> : <h1>Game Over</h1>}
          <h1>Your score is : {counter}</h1>
          <button onClick={() => window.location.reload()}>Try again</button>
        </div>
      )}
      <img
        src={myCar}
        className="myCar"
        style={{ left: `${myCarPosition}px` }}
      />
      <h1 className="top-score">last score is : {topScore ? topScore : 0}</h1>
      <h1 className="current-score">current score : {counter}</h1>
      <div className="other-cars">
        {carsArray.map((item, index) => {
          return (
            <animated.div
              style={otherCarsStyles[index]}
              key={index}
              ref={(el) => (otherCarsRefs.current[index] = el)}
            >
              <img src={item.image} className={item.className} />
            </animated.div>
          );
        })}
      </div>
    </div>
  );
};

export default Car;
