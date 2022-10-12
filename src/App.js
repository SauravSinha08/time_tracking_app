import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setTask((prevVal) => {
      return { ...prevVal, [name]: value };
    });
  }

  const addIteam = () => {
    if ((task.title === " ", task.description === " ")) {
    } else {
      setAdd([task, ...add]);
    }
    setTask({ title: " ", description: " " });
    setShow(false);
  };

  const modal = () => {
    setTimerOn(false);
    setShow(true);
  };

  const exitModal = () => {
    setShow(false);
    setTask({ title: " ", description: " " });
  };

  const onDelete = (id) => {
    setAdd((oldData) =>
      oldData.filter((currData, index) => {
        return id !== index;
      })
    );
  };

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  return (
    <>
      <div className="Timer">
        <div id="display">
          <span>{("0" + Math.floor((time / 1440000) % 24)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        </div>

        <div id="buttons">
          {!timerOn && time === 0 && (
            <button onClick={() => setTimerOn(true)}>Start</button>
          )}
          {timerOn && <button onClick={() => setTimerOn(false)}>Stop</button>}
          {!timerOn && time > 0 && (
            <button onClick={() => setTime(0)}>Reset</button>
          )}
          {!timerOn && time > 0 && (
            <button onClick={() => setTimerOn(true)}>Resume</button>
          )}
          <button onClick={modal}>Save</button>
        </div>
      </div>
      <div className="Task_Section flex_row">
        {show ? (
          <div className="Task_box flex_col">
            <input
              type="text"
              value={task.title}
              name="title"
              onChange={handleChange}
              placeholder="Title"
            />
            <textarea
              type="text"
              value={task.description}
              name="description"
              onChange={handleChange}
              placeholder="Add Description"
            />
            <div className="Task_box_buttons">
              <button onClick={addIteam}>Save</button>
              <button onClick={exitModal}>Cancel</button>
            </div>
          </div>
        ) : null}
      </div>
      <div className="store flex_row">
        {add.map((data, id) => {
          return (
            <div className="info_box" key={id}>
              <p>{data.title}</p>
              <p>{data.description}</p>
              <button className="delete" onClick={() => onDelete(id)}>
                <i className="bi bi-trash"></i>
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
