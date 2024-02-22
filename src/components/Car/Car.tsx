import "./Car.scss";
import myCar from "../../assets/Images/myCar.png";
import car1 from "../../assets/Images/car1.png";
import car2 from "../../assets/Images/car2.png";
import car3 from "../../assets/Images/car3.png";
import car4 from "../../assets/Images/car4.png";
import { useSpring, animated } from "@react-spring/web";
import React from "react";

const Car = () => {
  const calcRandom = () => {
    return Math.random() * window.innerWidth - 50;
  };
  const otherCarsRefs: any = React.useRef([]);
  const [myCarPosition, setMyCarPosition]: any = React.useState(50);
  const [randomValue, setRandomValue]: any = React.useState();
  const [stopGame, setStopGame]: any = React.useState(false);

  const carsArray = [
    { image: car1, className: "other-car car1" },
    { image: car2, className: "other-car car2" },
    { image: car3, className: "other-car car3" },
    { image: car4, className: "other-car car4" },
  ];

  /* Animations for Other Cars */
  const otherCarsStyles: any = carsArray.map((_, index) => {
    let speed = index * 100 + 2000;

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
    document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowRight") {
        setMyCarPosition((prev: any) => prev + 10);
      } else if (event.key === "ArrowLeft") {
        setMyCarPosition((prev: any) => prev - 10);
      }
    });
  }, []);

  /* Check cars collision */
  const positionX0 = otherCarsRefs?.current[0]?.style.left;
  //const positionX1 = otherCarsRefs?.current[1]?.style.left;
  //const positionX2 = otherCarsRefs?.current[2]?.style.left;
  //const positionX3 = otherCarsRefs?.current[3]?.style.left;
  const positionX0Number = Number(positionX0?.slice(0, positionX0.length - 2));
  //const positionX1Number = Number(positionX1?.slice(0, positionX1.length - 2));
  //const positionX2Number = Number(positionX2?.slice(0, positionX2.length - 2));
  //const positionX3Number = Number(positionX3?.slice(0, positionX3.length - 2));
  ///////////////////////////////
  const positionY0 = otherCarsRefs.current[0]?.style?.top;
  //const positionY1 = otherCarsRefs.current[1]?.style?.top;
  //const positionY2 = otherCarsRefs.current[2]?.style?.top;
  //const positionY3 = otherCarsRefs.current[3]?.style?.top;
  const positionY0Number = Number(positionY0?.slice(0, positionY0.length - 2));
  //const positionY1Number = Number(positionY1?.slice(0, positionY1.length - 2));
  //const positionY2Number = Number(positionY2?.slice(0, positionY2.length - 2));
  //const positionY3Number = Number(positionY3?.slice(0, positionY3.length - 2));

  React.useEffect(() => {
    // console.log(positionY0Number ,' | ', myCarPosition)
    if (positionY0Number > 390 && positionY0Number < 410) {
      console.log("AAAAAAAAAAA");
      if (
        positionX0Number >= myCarPosition - 50 &&
        positionX0Number <= myCarPosition + 50
      ) {
        setStopGame(true);
        console.log("FINALFINALFINALFINAL");
      }
    }
  }, []);

  return (
    <div className="car">
      {stopGame && (
        <div className="stop-game-message flexCenterColumn">
          <h1>Game Over</h1>
          <button onClick={() => window.location.reload()}>Try again</button>
        </div>
      )}
      <img
        src={myCar}
        className="myCar"
        style={{ left: `${myCarPosition}px` }}
      />
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
