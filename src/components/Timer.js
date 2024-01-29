import React, { useEffect, useState } from "react";
import alaram from "./alaram.wav";

const Timer = () => {
  const [showtime, setShowTime] = useState(1);
  const [isEnble, setIsEnable] = useState(false);
  const [userValue, setUserValue] = useState();

  const alaramSound = new Audio(alaram);
  const changeTime = () => {
    if (showtime > 0 && isEnble) {
      setShowTime((prev) => prev - 1);
    }
  };
  const extentMinutes=()=>{
    const currentTime=showtime

    const currentMinutes=Math.floor(currentTime/60)
    return currentMinutes
  }
  const currentSeconds=()=>{
    const currentTime=showtime
    const currentSeconds=  currentTime%60
    return currentSeconds
  }


  const startTime = () => {
    setIsEnable(true);
  };
  const pauseTime = () => {
    setIsEnable(false);
  };
  const resetTime = () => {
    setShowTime(10);
    setIsEnable(false);
  };
  const handleEnterValue = (e) => {
    setUserValue(e.target.value);
    
    
  };

  const handleSet = () => {
    // const value = parseInt(userValue);
    setShowTime(userValue);
    setUserValue('')
  };
  useEffect(() => {
    const intervalUpdate = setInterval(changeTime, 1000);
    if (showtime === 0) {
      alaramSound.play();
    }
    return () => {
      clearInterval(intervalUpdate);
    };
  }, [isEnble, showtime]);
  return (
    <div className="div">
      <div className="container">
        <h1 className="head">Pomodoro Timer</h1>
        <h2 className="numbers">{`${extentMinutes()}:${currentSeconds()}`}</h2>
        {isEnble ? (
          <button className="button1" onClick={pauseTime}>
            Pause
          </button>
        ) : (
          <button className="button" onClick={startTime}>
            Start
          </button>
        )}
        <button className="button2" onClick={resetTime}>
          Reset
        </button>
          <br/>
      
       <input
          type="numbers"
          onChange={handleEnterValue}
          value={userValue}
          placeholder="Enter the seconds"
          className="inputValue"
        />
        <button  className="button3" onClick={handleSet}>Add Time</button>
       

      </div>
    </div>
  );
};

export default Timer;
