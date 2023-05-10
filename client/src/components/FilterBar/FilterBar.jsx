import style from './FilterBar.module.css';

const FilterBar = () => {
return (
    <div className= {style.BarContainer}>
        <div className={style.FilterBar}>
            <p>Ordenar por:</p>
            <div className={style.OptionsContainer}>
                <button className={style.BtnOption}>Alfabeto</button>
                <button className={style.BtnOption}>Intensidad</button>
                <button className={style.BtnOption}>Clase</button>
                <button className={style.BtnOption}>Tipo de ejercicio</button>
            </div>
        </div>
    </div>
)
};

export default FilterBar;