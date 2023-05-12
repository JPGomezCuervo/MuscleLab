import style from './FilterBar.module.css';

const FilterBar = ({lessonsAtributtes}) => {

    
return (
    <div className= {style.BarContainer}>
        <div className={style.FilterBar}>
            <p>Ordenar por:</p>
            <div className={style.OptionsContainer}>
                <button className={style.BtnOption}>Alfabeto</button>
                <button className={style.BtnOption}>Intensidad</button>
                <button className={style.BtnOption}>Clase</button>
                <ul className={style.BtnOption1}>Tipo de ejercicio
                <div className={style.DropMenuContainer}>
                    <ul className={style.DropMenu}>
                        {lessonsAtributtes.map((atribute) => {
                            return(
                                <li key={atribute.id}>
                                    <button className={`${style.DropMenuBtn} ${style.Active}`}>
                                        {atribute.name}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                    <button className={style.FilterButton}>filtrar</button>
                </div>
                </ul>
            </div>
        </div>
    </div>
)
};

export default FilterBar;