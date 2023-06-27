import React from "react";
import style from "./Nosotros.module.css";
import teamData from "./teamData";
import { useEffect } from "react";

const Nosotros = () => {

  useEffect(() => {
    window.scrollTo({top: 0, left:0, behavior: 'auto'})
    
}, []);
  return (
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
          <a href="https://muscle-lab-six.vercel.app/clases" className={style.Button}>
            Nuestras clases
          </a>
        </div>
        
    </div>
    <div className={style.TeamContainer}>
          <h3>Miembros del equipo:</h3>
          {teamData.map((member) => (
            <div key={member.id} className={style.TeamMember}>
              <img src={member.image} alt={member.name} />
              <h4>{member.name}</h4>
              <div className={style.MemberLinks}>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </div>

            </div>
          ))}
        </div>
    </div>
  );
};

export default Nosotros;