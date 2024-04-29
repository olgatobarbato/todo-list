import styles from "./index.module.scss";

const ToDoItem = ({ data }) => {
  const { todo_title, todo_content, todo_date, todo_time, categories } = data;
  return (
    <div className={styles.wrapper}>
      <h3>{todo_title}</h3>
      <p>{todo_content}</p>
      <div className={styles.date}>
        <p>{todo_date}</p>
        <p>{todo_time}</p>
      </div>
      <p>{categories}</p>
    </div>
  );
};

export default ToDoItem;
