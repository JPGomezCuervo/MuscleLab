import React from "react";
import style from "./Nosotros.module.css"

const Nosotros = ()=>(

    <div className={style.MainContainer}>
        <h2>Nosotros</h2>
        <div className={style.BlockContainer}>
            <div className={style.TextBlock}>
                <p>
                En MuscleLab, te ayudamos a alcanzar tus objetivos de salud y fitness mediante un ambiente motivador y de alto rendimiento. Contamos con un equipo de entrenadores altamente capacitados que brindan orientación personalizada para perder peso, tonificar, ganar fuerza o mejorar la resistencia. Estamos comprometidos en proporcionarte las herramientas y conocimientos necesarios para lograr una vida más saludable.
                </p>
                <p>
                En MuscleLab, contamos con instalaciones de última generación y una amplia variedad de equipos de alta calidad para entrenamiento cardiovascular y de fuerza. También ofrecemos clases grupales dinámicas, desde entrenamiento funcional hasta yoga y pilates. Nuestra comunidad se enfoca en el bienestar y te ayudamos a transformar tu cuerpo, mejorar tu salud y lograr un estilo de vida activo. ¡Únete a nosotros y descubre tu potencial físico en nuestro gimnasio acogedor!
                </p>
                <a href='http://localhost:3000/clases' className={style.Button}>Nuestras clases</a>
            </div>
                 

        </div>
    </div>
)



export default Nosotros;