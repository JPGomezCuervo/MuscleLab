import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {selectLesson } from "../../redux/features/lessonsSlice"
import style from "./DetailLesson.module.css";
import brad from "../../assets/images/detail/brad.jpeg"
import mujer from "../../assets/images/lessons/mujer-boxeando.jpg"
import NavBar from "../NavBar/NavBar";




const DetailLesson = ()=> {

    const lesson = useSelector(selectLesson)
    
console.log(lesson)
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
                            <h2 className={style.text}>Lunes, miercoles y viernes</h2>
                            <h2 className={style.text}>18hs a 19hs</h2>
                            <h2 className={style.text}>Duración de clase: 50 minutos</h2>
                            <h2 className={style.text}>Intensidad: media</h2>
                        </div>
                        <div className={style.conjuntoMujerycaja}>
                            <div className={style.fondoMujer}>
                            <img src={mujer} alt="mujer boxeando" className={style.mujerBox} />
                            </div>
                        </div>
                    </div>
                <div className={style.detalleparrafo}>
                <p className={style.txt}>Durante esta sesión de entrenamiento, los participantes tendrán la oportunidad de mejorar su fuerza, resistencia, coordinación y habilidades de boxeo. 
                La clase se centrará en una combinación de técnicas de boxeo y acondicionamiento físico para proporcionar una experiencia de entrenamiento integral.</p>
                </div>

            </div>


        </div>
    )
}



export default DetailLesson