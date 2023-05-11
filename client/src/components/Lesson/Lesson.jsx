import style from './Lesson.module.css';

const Lesson = ({lesson, index}) => {
    const {name, description, image} = lesson;
    console.log(index);
    
    const cardType = index % 2 === 0 ? 'Right' : 'Left';

    return (
        <div className={style.Card}>
          {cardType === 'Right' ? (
            <>
              <div className={style.ImageContainer}>
                <img src={image} alt={name} />
              </div>
              <div className={style.InfoContainer}>
                <h2>{name}</h2>
                <p>{description}</p>
                <button>Más info</button>
              </div>
            </>
          ) : (
            <>
              <div className={style.InfoContainer}>
                <h2>{name}</h2>
                <p>{description}</p>
                <button>Más info</button>
              </div>
              <div className={style.ImageContainer}>
                <img src={image} alt={name} />
              </div>
            </>
          )}
        </div>
      );
      
}

export default Lesson;