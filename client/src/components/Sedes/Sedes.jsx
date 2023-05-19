import React from "react";
import style from "./Sedes.module.css"
import { fetchAllOffices, selectAllOffices } from '../../redux/features/officesSlice';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
const Sedes = () => {

    const sedes = useSelector(selectAllOffices)

    const dispatch = useDispatch();


useEffect(()=>{
    dispatch(fetchAllOffices())
})



    return (
        <div>
            <h1>Sedes</h1>
        </div>
    )
}


export default Sedes;