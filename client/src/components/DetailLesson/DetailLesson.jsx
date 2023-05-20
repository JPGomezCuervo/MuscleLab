import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {selectLesson, fetchLessonsByID, selectAllLessons } from "../../redux/features/lessonsSlice"
import style from "./DetailLesson.module.css";
import brad from "../../assets/images/detail/brad.jpeg"
import NavBar from "../NavBar/NavBar";
import { useEffect } from "react";
import { useParams , Link} from "react-router-dom";





const DetailLesson = ()=> {

   const lesson = useSelector(selectLesson)
   console.log(lesson)

//    if(Object.keys(lesson).length !== 0){
//     lesson?.map(el=> console.log(1))
//    }

    

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(()=>{
        dispatch(fetchLessonsByID(params.name))
    },[dispatch, params.name])

    return(

        <div>
            <NavBar/>
                { 
                    Object.keys(lesson).length !== 0
                    ?
                    lesson.map((lesson)=>{
                    return (
                        <div className={style.conteinerTodo}>
                        <h1 className={style.h1}>{lesson?.name}</h1>

                        <div className={style.fondoinstrYHor}>

                        <div className={style.conjuntoMujerycaja}>
                            <div className={style.fondoMujer}>
                                <img src={lesson?.image} alt="mujer boxeando" className={style.imagenDeporte} />
                            </div>
                        </div>

                        <div className={style.contentHorarios}>
                            <h2 className={style.text}>Dias: {lesson?.scheduleDays?.join(", ")}</h2>
                            <h2 className={style.text}>Horario: {lesson?.scheduleHourStart}hs - {lesson?.scheduleHourFinish}hs</h2>
                            <h2 className={style.text}>Objetivos: {lesson?.goals}</h2>
                            <h2 className={style.text}>Intensidad: {lesson?.effort}</h2>   
                            <h2 className={style.text}>Tipo de ejercicio: {lesson?.types?.join(", ")}</h2>
                            <h2 className={style.text}>Sucursal: {lesson?.office}</h2>
                            
                               
                        </div>

                        

                        <div className={style.fondoBrad}>
                            <img src={brad} alt="instructor" className={style.img} />
                            <h2 className={style.instructor}>Instructor:</h2>
                            <h2 className={style.instructor}>{lesson?.monitors}</h2>
                        </div>

                    </div>

                <div className={style.detalleparrafo}>
                    <p className={style.txt}>{lesson.description}</p>
                </div>

               
            </div>
                    )})
                   
                     :
                     <h1>Cargando datos</h1>
                }

<div className={style.botones}>
                    <button className={style.button3}>Elegí tu sede acá</button>
                    <button className={style.button3}>Elegí tu horario</button>
                    <button className={style.button3}>Elegí tu instructor acá</button>
                </div>
                <Link to = {'/clases'}>
               <button className={style.button}>Atras</button>
                </Link>


        </div>
    )
}



export default DetailLesson