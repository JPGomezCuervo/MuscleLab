import bodyCombat from '../assets/images/lessons/mujer-boxeando.jpg'
import pilates from '../assets/images/lessons/mujeres-yoga.jpg'
import entrenamientoFuncional from '../assets/images/lessons/grupo-haciendo-ejercicio.jpg'
// aquí vamos a hardcodear las rutinas mientras el
// back envía datos

const lessons = [
    {
        id: 1,
        name: 'Body combat',
        description: 'La clase de artes marciales (karate, boxeo, muay thai, capoeira)',
        image: bodyCombat,
    },
    {
        id: 2,
        name: 'Pilates',
        description: 'La clase de pilates',
        image: pilates,
    },
    {
        id: 3,
        name: 'Entrenamiento funcional',
        description: 'La clase de entrenamiento funcional',
        image: entrenamientoFuncional,
    },
];

export default lessons;


