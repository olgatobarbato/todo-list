import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

const ModalPut = ({ onClose }) => {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Work");
  const [title, setTitle] = useState("");
  const [todoData, setTodoData] = useState([]);
  const router = useRouter();

  const todoId = getCookie("TodoId");

  useEffect(() => {
    fetch(`/api/todos/${todoId}`)
      .then((res) => res.json())
      .then((data) => {
        setTodoData(data.data);
        setTitle(data.data.todo_title);
        setContent(data.data.todo_content);
        setDate(new Date(data.data.todo_date));
        setTime(new Date(data.data.todo_time));
        setCategory(data.data.categories);
      });
  }, []);

  const categories = ["Work", "Personal", "Home"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTodoData = {
      todo_title: title,
      todo_content: content,
      todo_date: date,
      todo_time: time,
      categories: category,
    };

    try {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodoData),
      });
      if (!response.ok) {
        throw new Error("Network Response was not ok!");
      }
      onClose();
      router.reload("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Your task title"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Home">Home</option>
          </select>
          <textarea
            rows="4"
            value={content}
            className={styles.content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="your title"
          />
          <div className={styles.datepickerWrapper}>
            <DatePicker
              className={styles.datepicker}
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="dd / MM / yyyy"
            />
            <DatePicker
              selected={time}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              onChange={(time) => setTime(time)}
              dateFormat="h:mm aa"
            />
          </div>
          <div className={styles.buttonWrapper}>
            <input className={styles.button} type="submit" value="Save" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalPut;
