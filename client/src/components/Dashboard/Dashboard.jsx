import React, { useEffect, useState } from "react";
import { selectAllLessons } from "../../redux/features/lessonsSlice";
import { useSelector, useDispatch } from "react-redux";
import style from "./Dashboard.module.css";
import { fetchAllLessons } from "../../redux/features/lessonsSlice";


const Dashboard = () => {
  const [serverResponse, setServerResponse] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllLessons());
  }, [serverResponse]); //eslint-disable-next-line react-hooks/exhaustive-deps

  const lessons = useSelector(selectAllLessons);
  

  const removeLessonHandler = (event) => {
    const id = event.target.name;

    let text = "Esta accion no se podra revertir!\nPulse OK o Cancelar.";
    if (window.confirm(text) === true) {
      fetch("https://musclelabii.onrender.com/lessons/delete/" + id, {
        method: "DELETE",
      })
        .then((response) => setServerResponse(response))
        .catch((error) => setServerResponse(error));

      alert("Borrado con exito!");
    } else {
      alert("Cancelado por el usuario");
    }
  };

  return (
    <div className={style.container}>
      <hr />
      <h1>Dashboard</h1>
      <div className={style.title}>Clases: {lessons.length}</div>
      <div className={style.containerTable}>
        {!lessons.length ? (
          <div className={style.empty}>
            <p>No hay clases para mostrar!</p>
          </div>
        ) : (
          lessons.map((lesson) => (
            <div key={lesson.id} className={style.item}>
              {lesson.name}
              <div />
              <div className={style.item}>
                <img
                  src={lesson.image}
                  alt={lesson.name}
                  className={`${style.img}`}
                />
              </div>
              <div>
                <button
                  name={lesson.id}
                  onClick={removeLessonHandler}
                  className={style.btn}
                >
                  Borrar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <hr />
       
    </div>
  );
};

export default Dashboard;
