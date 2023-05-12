import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {selectLesson, fetchLessonsByID } from "../../redux/features/lessonsSlice"
import style from "./DetailLesson.module.css";
import brad from "../../assets/images/detail/brad.jpeg"
import mujer from "../../assets/images/lessons/mujer-boxeando.jpg"
import NavBar from "../NavBar/NavBar";
import { useEffect } from "react";
import lessons from "../../utils/lessons"




const DetailLesson = ()=> {

   // const lesson = useSelector(selectLesson)
    
   const lesson = lessons[0]
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchLessonsByID())
    },[dispatch])

    return(

        <div>
            <NavBar/>
            
            <div className={style.conteinerTodo}>

                <h1 className={style.h1}>{lesson.name}</h1>

                    <div className={style.fonditoImgyLetras}>
                        <div className={style.fondoBrad}>
                            <img src={brad} alt="instructor" className={style.img} />
                            <h2 className={style.instructor}>Instructor:</h2>
                            <h2 className={style.instructor}>Brad Pitt</h2>
                        </div>
                        <div className={style.contentHorarios}>
                            <h2 className={style.text}>{lesson.scheduleDays.join(" , ")}</h2>
                            <h2 className={style.text}>{lesson.scheduleHours}</h2>
                            <h2 className={style.text}>{lesson.goals}</h2>
                            <h2 className={style.text}>{lesson.effort}</h2>
                            <h2 className={style.text}>{lesson.category}</h2>
                        </div>
                        <div className={style.conjuntoMujerycaja}>
                            <div className={style.fondoMujer}>
                            <img src={lesson.image} alt="mujer boxeando" className={style.mujerBox} />
                            </div>
                        </div>
                    </div>
                <div className={style.detalleparrafo}>
                <p className={style.txt}>{lesson.description}</p>
                </div>

            </div>


        </div>
    )
}



export default DetailLesson