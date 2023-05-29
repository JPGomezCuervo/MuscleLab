import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchOfficeByID, selectOffice } from "../../redux/features/officesSlice";
import style from "./SedeHomeDetalle.module.css";

const SedeHomeDetalle = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const office = useSelector(selectOffice);


  useEffect(() => {
    dispatch(fetchOfficeByID(params.id));
  }, [dispatch, params.id]);

  // console.log(params.id)

  // console.log(office.branchoffice)
  
  return (
    <div>
      {  Object.keys(office).length !== 0
                    ?
                   (
      
        <div className={style.card}>
          <h1 className={style.h1}>{office?.branchoffice.name}</h1>
          <p className={style.text}>Dirección: {office?.branchoffice.location}</p>
          <p className={style.text}>Días de atención: {office?.branchoffice.scheduleDays?.join(", ")}</p>
          <p className={style.text}>Horario: {office?.branchoffice.scheduleHourStart
            } a {office.branchoffice.scheduleHourFinish
            }</p>
        </div>)
       : 
        <p>Loading</p>
}

<Link to = {'/sedes'}>
               <button className={style.button}>Atras</button>
                </Link>
    </div>
  );
};

export default SedeHomeDetalle;
