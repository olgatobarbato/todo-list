import styles from "./index.module.scss";
import { format, parseISO } from "date-fns";

const getCategoryColor = (category) => {
  switch (category) {
    case "Work":
      return "#fdfbb6";
    case "Personal":
      return "#f4acac";
    case "Home":
      return "#c8f8bf";
  }
};

const ToDoItem = ({ data }) => {
  const { todo_title, todo_content, todo_date, todo_time, categories } = data;

  const formattedDate = todo_date
    ? format(new Date(todo_date), "dd/MM/yyyy")
    : "";

  let formattedTime = "";
  if (todo_time) {
    try {
      const parsedTime = parseISO(todo_time);
      formattedTime = format(parsedTime, "HH:mm");
    } catch (error) {
      console.error("Error parsing time:", error);
    }
  }
  const dateTime = [formattedDate, formattedTime].filter(Boolean).join(" – ");

  return (
    <div className={styles.wrapper}>
      <button className={styles.button}>X</button>
      <h3>{todo_title}</h3>
      <p>{todo_content}</p>
      {dateTime ? (
        <div className={styles.date}>
          {" "}
          <p>{dateTime}</p>
        </div>
      ) : null}
      <p>
        <span
          className={styles.categorySquare}
          style={{ backgroundColor: getCategoryColor(categories) }}
        />
        {categories}
      </p>
    </div>
  );
};

export default ToDoItem;
