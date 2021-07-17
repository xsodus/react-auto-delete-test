import "./styles.css";
import React, { useState, useRef } from "react";
import ToDoItem from "./ToDoItem";

export default function App() {
  let [toDoList, setToDoList] = useState([]);

  // Use this variable in the callback function because the state does not update synchronously.
  const rawToDoList = useRef([]);

  const removeTheOldestItemFromDoList = () => {
    rawToDoList.current.shift();
    setToDoList([...rawToDoList.current]);
  };

  return (
    <div className="App">
      <h1>Auto Delete To Do Test</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const toDoSubject = event.target[0].value;
          if (!toDoSubject) return;
          rawToDoList.current.push(
            <ToDoItem
              key={`todo-${new Date().getTime()}`}
              text={toDoSubject}
              timeout={5000}
              callback={removeTheOldestItemFromDoList}
            />
          );
          setToDoList([...rawToDoList.current]);
        }}
      >
        <input type="text" name="todo" />
        <button type="submit">Submit</button>
        {toDoList}
      </form>
    </div>
  );
}
