import React, { useEffect } from "react";

const ToDoItem = ({ text, timeout, callback }) => {
  useEffect(() => {
    const timeoutFunc = setTimeout(callback, timeout);
    return () => {
      clearTimeout(timeoutFunc);
    };
  }, [text, timeout, callback]);
  return <div>{text}</div>;
};

export default ToDoItem;
