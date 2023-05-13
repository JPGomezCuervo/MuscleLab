import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {selectLesson, fetchLessonsByID, selectAllLessons, fet } from "../../redux/features/lessonsSlice"
import style from "./DetailLesson.module.css";
import brad from "../../assets/images/detail/brad.jpeg"
import NavBar from "../NavBar/NavBar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";




const DetailLesson = ()=> {

   const lesson = useSelector(selectLesson)
   
   console.log(lesson)
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(()=>{
        dispatch(fetchLessonsByID(params.id))
    },[dispatch])

    return(

        <div>
            <NavBar/>
            

                {
                    
                    lesson 
                    ?
                    <div className={style.conteinerTodo}>
                    <h1 className={style.h1}>{lesson.name}</h1>

                    <div className={style.fondoinstrYHor}>

                    <div className={style.conjuntoMujerycaja}>
                            <div className={style.fondoMujer}>
                            <img src={lesson.image} alt="mujer boxeando" className={style.mujerBox} />
                            </div>
                        </div>

                        <div className={style.contentHorarios}>
                            <h2 className={style.text}>{lesson.scheduleDays}</h2>
                            <h2 className={style.text}>{lesson.scheduleHourStart} - {lesson.scheduleHourFinish}</h2>
                            <h2 className={style.text}>{lesson.goals}</h2>
                            <h2 className={style.text}>{lesson.effort}</h2>   
                            <h2>{lesson.types.join(" , ")}</h2>
                            
                               
                        </div>

                        

                        <div className={style.fondoBrad}>
                            <img src={brad} alt="instructor" className={style.img} />
                            <h2 className={style.instructor}>Instructor:</h2>
                            <h2 className={style.instructor}>Brad Pitt</h2>
                        </div>

                    </div>

                <div className={style.detalleparrafo}>
                <p className={style.txt}>{lesson.description}</p>
                </div>

                <div>
                    <h2 className={style.text}>Elegi tu clase ideal </h2>
                </div>
                <div className={style.div1}>
                    <div className={style.div2}> 3 </div>
                    <div className={style.div3}>5</div>
                    <div className={style.div4}>3 </div>
                </div>
            </div>
                     :
                     <h1>Cargando datos</h1>
                }

               


        </div>
    )
}



export default DetailLesson