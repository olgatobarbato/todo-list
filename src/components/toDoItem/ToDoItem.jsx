import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useState } from "react";
import ModalPut from "../ModalPut";

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

const formatTime = (timeString) => {
  const dateObj = new Date(timeString);
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  return `${hour < 10 ? "0" : ""}${hour}:${minute < 10 ? "0" : ""}${minute}`;
};

const formatDate = (dateString) => {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
  return `${day}-${month}-${year}`;
};

const ToDoItem = ({ data }) => {
  const {
    todo_title,
    todo_content,
    todo_date,
    todo_time,
    categories,
    _id,
    isInProgress,
  } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState(!isInProgress);

  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
    setCookie("TodoId", _id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCookie("TodoId", "");
  };

  const handleCompleteTask = async () => {
    setIsTaskCompleted(!isTaskCompleted);

    const dataToComplete = {
      isInProgress: !isTaskCompleted,
    };
    try {
      const response = await fetch(`/api/todos/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToComplete),
      });
      if (!response.ok) {
        throw new Error("Network Response was not ok!");
      }
      router.reload("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = await fetch(`/api/todos/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network Response was not ok!");
      }
      router.reload("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const dateTime = [formatDate(todo_date), formatTime(todo_time)]
    .filter(Boolean)
    .join(" – ");

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={handleDeleteTask}>
        X
      </button>
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
      <input
        type="checkbox"
        checked={isTaskCompleted}
        onChange={handleCompleteTask}
        className={styles.completeCheckbox}
      />
      <button className={styles.editTask} onClick={openModal}>
        Edit task
      </button>
      {isModalOpen && <ModalPut onClose={closeModal} />}
    </div>
  );
};

export default ToDoItem;
