import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

const Modal = () => {
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Task title"
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          placeholder="Your task"
        />
        <DatePicker
          selected={time}
          onChange={(time) => setTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm a"
        />
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat, index) => (
            <option value={cat} key={index}>
              {cat}
            </option>
          ))}
        </select>
        <input type="submit" value="Save your task" />
      </form>
    </div>
  );
};

export default Modal;
