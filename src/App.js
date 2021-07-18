import "./styles.css";
import React, { useState, useRef } from "react";
import ToDoItem from "./ToDoItem";

export default function App() {
  const [toDoList, setToDoList] = useState([]);

  // Use this variable in the callback function because the state does not update synchronously.
  const rawToDoList = useRef([]);

  const removeToDoItem = (code) => {
    // We can simply remove it by rawToDoList.current.shift();
    // but it is not a good solotion for the future case
    // because we may delete it at wrong index if the timeout is dynamic value.
    // So, I changed the logic to remove at its index instead.
    rawToDoList.current = rawToDoList.current.filter(
      (item) => item.code !== code
    );
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
          const key = `todo-${new Date().getTime()}`;
          rawToDoList.current.push({
            code: key,
            component: (
              <ToDoItem
                key={key}
                code={key}
                text={toDoSubject}
                timeout={5000}
                callback={removeToDoItem}
              />
            )
          });
          setToDoList([...rawToDoList.current]);
        }}
      >
        <input type="text" name="todo" />
        <button type="submit">Enter</button>
        {toDoList.map((item) => {
          return item.component;
        })}
      </form>
    </div>
  );
}
