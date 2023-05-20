import React from "react";
import style from "./Sedes.module.css"
import { fetchAllOffices, selectAllOffices } from '../../redux/features/officesSlice';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Sede from "../Sede/Sede";

const Sedes = () => {

    const sedes = useSelector(selectAllOffices)
     
    const dispatch = useDispatch();


useEffect(()=>{
    dispatch(fetchAllOffices())
})



    return (
        <div >
            
            <div className={style.Container}>

            {sedes.branchoffice?.map((sede, index)=> {
                return <Sede key={sede.id} sede={sede} index={index} />
            })}
            </div>

        </div>
    )
}


export default Sedes;