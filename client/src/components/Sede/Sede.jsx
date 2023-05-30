import React from "react";
import { Link } from "react-router-dom";
import style from "./Sede.module.css";
import fachada1 from "../../assets/images/sedes/fachada-1-gym.jpg";
import fachada2 from "../../assets/images/sedes/fachada-2-gym.jpg";

const Sede = ({ sede, index }) => {
  const { name, location, scheduleDays, scheduleHours, id, image} = sede;
  const card = index % 2 === 0 ? "Right" : "Left";

  return (
    <div className={style.Card}>
      {card === "Right" ? (
        <div className={style.contenedor}>
          <div className={style.ImageContainer}>
            <img src={image} alt="fachada 1" />
          </div>

          <div className={style.InfoContainer}>
            <h2>{name}</h2>
            {/* <p>Dirección: {location}</p>
            <p>Días de atención: {scheduleDays}</p>
            <p>Horario: {scheduleHours}</p> */}

            <Link to={`/sedes/detalles/${id}`}>
              <button>Detalles aquí</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className={style.content}>
          <div className={style.InfoContainer}>
            <h2>{name}</h2>
            {/* <p>{location}</p>
            <p>{scheduleDays}</p>
            <p>{scheduleHours}</p> */}

            <Link to={`/sedes/detalles/${id}`}>
              <button>Detalles aquí</button>
            </Link>
          </div>

          <div className={style.ImageContainer}>
            <img src={image} alt="fachada 2" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sede;
