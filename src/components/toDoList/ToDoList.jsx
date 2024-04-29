import styles from "./index.module.scss";
import ToDoItem from "../toDoItem";
import { useState, useEffect } from "react";

const ToDoList = () => {
  const [toDoData, setToDoData] = useState([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setToDoData(data.data));
  }, []);

  return (
    <div>
      {toDoData.map((todo, index) => (
        <ToDoItem key={index} data={todo} />
      ))}
    </div>
  );
};

export default ToDoList;
