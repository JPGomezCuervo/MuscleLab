import React from "react";
import style from "./Sedes.module.css"
import { fetchAllOffices, selectAllOffices, selectStatus } from '../../redux/features/officesSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Sede from "../Sede/Sede";
import loadingGif from '../../assets/gifs/loading.gif';
import SedeMobile from "../SedeMobile/SedeMobile";

const Sedes = () => {

    const dispatch = useDispatch();
    const sedes = useSelector(selectAllOffices)
    const status = useSelector(selectStatus)
     


useEffect(()=>{
    dispatch(fetchAllOffices())
}, [dispatch])



    return (
        <>
                {status === "loading" && <img className={style.LoadingIcon} src={loadingGif} alt=""/>}
            <div className={style.Container}>

            {sedes?.map((sede, index)=> {
                return <Sede key={sede.id} sede={sede} index={index} />
            })}
            </div>
            <div className={style.ContainerMobile}>
            {sedes?.map((sede, index)=> {
                return <SedeMobile key={sede.id} sede={sede} index={index} />

            }
            )}
            </div>
        </>
    )
}


export default Sedes;