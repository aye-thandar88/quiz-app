import React, { useEffect, useRef, useState } from "react";
import "./index.scss";

const Timer = ({ duration, onTimeup }) => {
  const [counter, setCounter] = useState(0);
  const [progressLoad, setProgressLoad] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    setProgressLoad((counter / duration) * 100);

    if (counter === duration) {
      clearInterval(intervalRef.current);

      setTimeout(() => {
        onTimeup();
      }, 1000);
    }
  }, [counter]);

  return (
    <div className="timer-container">
      <div
        style={{
          width: `${progressLoad}%`,
          background: `${
            progressLoad < 40 ? "green" : progressLoad < 70 ? "orange" : "red"
          }`,
        }}
        className="progress"
      ></div>
    </div>
  );
};

export default Timer;
