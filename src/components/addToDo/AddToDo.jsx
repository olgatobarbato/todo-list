import styles from "./index.module.scss";
import { useState } from "react";
import Modal from "../modal";

const AddToDo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className={styles.button} onClick={openModal}>
        + Add new task
      </button>
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
};

export default AddToDo;
