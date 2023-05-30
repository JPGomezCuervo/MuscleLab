import React from "react";
import { Link } from "react-router-dom";
import style from "./SedeMobile.module.css";
import fachada1 from "../../assets/images/sedes/fachada-1-gym.jpg";
import fachada2 from "../../assets/images/sedes/fachada-2-gym.jpg";

const SedeMobile = ({ sede, index }) => {
  const { name, location, scheduleDays, scheduleHours, id, image} = sede;

  return (
    <div className={style.Card}>
        <>
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
        </>
      </div>
  );
};

export default SedeMobile;
