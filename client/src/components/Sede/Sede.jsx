import React from "react";
import { Link } from "react-router-dom";
import style from "./Sede.module.css";

const Sede = ({ sede, index }) => {
  const { name, id, image} = sede;
  const card = index % 2 === 0 ? "Right" : "Left";

  return (
    <div className={style.Card}>
      {card === "Right" ? (
        <>
          <div className={style.ImageContainer}>
            <img src={image} alt="" />
          </div>

          <div className={style.InfoContainer}>
            <h2>{name}</h2>
            <Link to={`/sedes/detalles/${id}`}>
              <button>Detalles aquí</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className={style.InfoContainer}>
            <h2>{name}</h2>

            <Link to={`/sedes/detalles/${id}`}>
              <button>Detalles aquí</button>
            </Link>
          </div>

          <div className={style.ImageContainer}>
            <img src={image} alt="fachada 2" />
          </div>
        </>
      )}
    </div>
  );
};

export default Sede;
