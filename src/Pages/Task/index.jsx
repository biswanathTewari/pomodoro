import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";

import { Tags } from "../../components";
import { useGlobalState } from "../../store";
import { updateTodoService } from "../../services";
import refresh from "../../assets/music/refresh.wav";
import "./styles.scss";

const Task = () => {
  const {
    state: { todo },
  } = useLocation();
  const { showToast } = useGlobalState();
  const navigate = useNavigate();
  let duration = todo ? todo.time * 60 : 60;
  const [isActive, setIsActive] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [timePercent, setTimePercent] = React.useState(100);
  const [timeDisplay, setTimeDisplay] = React.useState("00:00");
  const [sessionType, setSessionType] = React.useState("FOCUS");
  const breakDuration = 5 * 60; // 5 minutes break
  const audioRef = React.useRef(null);
  const options = {
    chart: {
      height: 300,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
        dataLabels: {
          showOn: "always",
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    fill: {
      colors: ["#6060f5"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: [timeDisplay],
    responsive: [
      {
        breakpoint: 786,
        options: {
          chart: {
            height: 200,
            type: "radialBar",
          },
        },
      },
    ],
  };

  const updateTags = (tag) => {
    try {
      updateTodoService(todo.id, todo.title, todo.description, todo.time, tag);
      showToast({
        message: "Tag updated successfully!",
        type: "success",
      });
    } catch (err) {
      showToast({
        message: "Something went wrong",
        type: "error",
      });
    }
  };

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(true);
    setSessionType("FOCUS");
    setTime(duration);
  };

  const goBack = () => {
    navigate(-1);
  };

  const secondsToTime = (timeInSecs) => {
    let h = Math.floor(timeInSecs / 3600)
        .toString()
        .padStart(2, "0"),
      m = Math.floor((timeInSecs % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      s = Math.floor(timeInSecs % 60)
        .toString()
        .padStart(2, "0");

    return setTimeDisplay(h + "h:" + m + "m:" + s + "s");
  };

  const getTimepercent = (time, duration) => {
    const percent = (time / duration) * 100;
    setTimePercent(percent);
  };

  React.useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (isActive && sessionType === "FOCUS" && time === 0) {
      audioRef.current.play();
      setSessionType("BREAK");
      setTime(breakDuration);
    } else {
      setIsActive(false);
      clearInterval(interval);
    }
    getTimepercent(time, sessionType === "FOCUS" ? duration : breakDuration);
    secondsToTime(time);

    return () => {
      clearInterval(interval);
    };
  }, [isActive, time]);

  React.useEffect(() => {
    setTime(duration);
  }, [todo]);

  return (
    <div className="task__container">
      <div className="task">
        <div className="task__timer">
          <div className="clock">
            <Chart
              options={options}
              series={[timePercent]}
              type="radialBar"
              height={350}
            />
            <p className="label">{timeDisplay}</p>
            <p className="label">{sessionType}</p>
          </div>
          <div className="btns">
            {isActive ? (
              <div className="btn btn--pause" onClick={handlePause}>
                <i className="fas fa-pause"></i>
                pause
              </div>
            ) : (
              <div className="btn btn--start" onClick={handleStart}>
                <i className="fas fa-play"></i>
                start
              </div>
            )}
            <div className="btn btn--reset my-1" onClick={handleReset}>
              <i className="fas fa-redo"></i>
              reset
            </div>
          </div>
        </div>
        <div className="task__info">
          <h1 className="h3">{todo.title}</h1>
          <p className="text-lg">{todo.description}</p>
          <Tags tag={todo.tag} updateTags={updateTags} />
        </div>
      </div>
      <i className="fas fa-angle-left goback" onClick={goBack}></i>
      <audio ref={audioRef}>
        <source src={refresh} type="audio/wav" />
      </audio>
    </div>
  );
};

export default Task;
