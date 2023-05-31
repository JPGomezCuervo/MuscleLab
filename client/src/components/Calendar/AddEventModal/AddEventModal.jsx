import React, { useState } from "react";
import Modal from "react-modal";
import DateTime from "react-datetime";
import styles from "../AddEventModal/AddEventModal.module.css"
const AddEventModal = ({ isOpen, onClose, onEventAdded }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const onSubmit = (event) => {
    event.preventDefault();

    onEventAdded({
      title,
      start,
      end,
    });
    onClose();
  };

  const customStyles = {
    content: {
      top: "35%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "20%",
      borderRadius:"25px",
      backgroundColor: "rgba(390,280,156,0.35)",
      boxShadow: "0 0 15px rgba(0, 0, 0, 0.55)",
      transform: "translate(-40%, -10%)",
    },
  };

  return (
    <Modal 
        isOpen={isOpen} 
        onRequestClose={onClose}
        style={customStyles}>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          placeholder="Titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <div>
          <label htmlFor="" className={styles.label}>Fecha y Hora Inicial</label>
          <DateTime value={start} onChange={(date) => setStart(date)} />
        </div>
        <div>
          <label htmlFor="" className={styles.label}>Fecha y Hora Final</label>
          <DateTime value={end} onChange={(date) => setEnd(date)} />
        </div>
        <button className={styles.btn}>Agregar evento</button>
      </form>
      <button onClick={onClose} className={styles.btn2}>Atras</button>
    </Modal>
  );
};

export default AddEventModal;
