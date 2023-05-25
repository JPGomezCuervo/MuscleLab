import React from "react";
import style from "./Sedes.module.css"
import { fetchAllOffices, selectAllOffices, selectStatus } from '../../redux/features/officesSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Sede from "../Sede/Sede";
import loadingGif from '../../assets/gifs/loading.gif';

const Sedes = () => {

    const dispatch = useDispatch();
    const sedes = useSelector(selectAllOffices)
    const status = useSelector(selectStatus)
     


useEffect(()=>{
    dispatch(fetchAllOffices())
})



    return (
        <div >
            {status === "loading" && <img className={style.LoadingIcon} src={loadingGif} alt=""/>}
            <div className={style.Container}>

            {sedes?.map((sede, index)=> {
                return <Sede key={sede.id} sede={sede} index={index} />
            })}
            </div>

        </div>
    )
}


export default Sedes;