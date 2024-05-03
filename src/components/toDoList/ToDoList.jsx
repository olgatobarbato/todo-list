import styles from "./index.module.scss";
import ToDoItem from "../toDoItem";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const ToDoList = ({ data }) => {
  const [toDoData, setToDoData] = useState([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setToDoData(data.data));
  }, []);

  const selectedDate = format(new Date(data), "yyyy-MM-dd");
  const filteredTodos = toDoData.filter(
    (todo) => format(new Date(todo.todo_date), "yyyy-MM-dd") === selectedDate
  );

  return (
    <div className={styles.list}>
      {data === null &&
        toDoData.map((todo, index) => <ToDoItem key={index} data={todo} />)}
      {filteredTodos.map((todo, index) => (
        <ToDoItem key={todo._id || index} data={todo} />
      ))}
    </div>
  );
};

export default ToDoList;
