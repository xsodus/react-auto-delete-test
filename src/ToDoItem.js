import React, { useEffect } from "react";

const ToDoItem = ({ code, text, timeout, callback }) => {
  useEffect(() => {
    const timeoutFunc = setTimeout(() => {
      callback(code);
    }, timeout);
    return () => {
      clearTimeout(timeoutFunc);
    };
  }, [text, code, timeout, callback]);
  return <h2>{text}</h2>;
};

export default ToDoItem;
