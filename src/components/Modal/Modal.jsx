import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Modal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("");

  const categories = ["Work", "Personal", "Home"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todoData = {
      todo_title: title,
      todo_content: content,
      todo_date: date,
      todo_time: time,
      categories: category,
      isInProgress: true,
    };
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoData),
      });
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      const responseData = await response.json();
      console.log("Data response:", responseData);

      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Task title"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat, index) => (
            <option value={cat} key={index}>
              {cat}
            </option>
          ))}
        </select>
        <textarea
          rows="4"
          value={content}
          className={styles.content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          placeholder="Your task"
        />
        <div className={styles.datepickerWrapper}>
          <DatePicker
            className={styles.datepicker}
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="dd / MM / yyyy"
          />
          <DatePicker
            className={styles.datepicker}
            selected={time}
            onChange={(time) => setTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm a"
          />
        </div>
        <div className={styles.buttonWrapper}>
          <input
            className={styles.button}
            type="submit"
            value="Save your task"
          />
        </div>
      </form>
    </div>
  );
};

export default Modal;
