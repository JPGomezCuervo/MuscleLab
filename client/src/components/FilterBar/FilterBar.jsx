import style from './FilterBar.module.css';
import { useDispatch } from 'react-redux';
import { orderFromAtoZ, orderFromZtoA, orderFomHardestToEasiest, orderFromEasiestToHardest, sortByType, sortByIntensityandType, sortByIntensity, fetchAllLessons } from '../../redux/features/lessonsSlice';
import { useState } from 'react';
import trashIcon from "../../assets/icons/trash-bin.png"

const FilterBar = ({lessonsAtributtes}) => {
    const [alphabetOrder, setAlphabetOrder] = useState(false);
    const [effortOrder, setEffortOrder] = useState(false);
    const [selectedType, setSelectedType] = useState([]);
    const [selectedIntensity, setSelectedIntensity] = useState([]);
    const intensity = [1,2,3,4,5]
    const dispatch = useDispatch();

    const handleAlfabetoClick = () => {
        if (!alphabetOrder) {
            dispatch(orderFromZtoA());
            setAlphabetOrder(true);
        } else {
            dispatch(orderFromAtoZ());
            setAlphabetOrder(false);
        }
    };
    
    const handleIntensidadClick = () => {
        // if (!effortOrder) {
        //     dispatch(orderFomHardestToEasiest());
        //     setEffortOrder(true);
        // } else {
        //     dispatch(orderFromEasiestToHardest());
        //     setEffortOrder(false);
        // }
        setSelectedIntensity([]);
    };
    const handleTipoEjercicioClick = () => {
        setSelectedType([]);
    };

    const handleTypeClick = (event) => {
        const name = event.target.name;
        if(!selectedType.includes(name)){
            setSelectedType([...selectedType, name]);
        } else {
            setSelectedType(selectedType.filter((type) => type !== name));
        }
    };

    const handleIntensityClick = (event) => {
        const name = event.target.name;
        if (!selectedIntensity.includes(name)) {
            setSelectedIntensity([...selectedIntensity, name]);
        } else {
            setSelectedIntensity(selectedIntensity.filter((intensity) => intensity !== name));
        }
    };
    
    const handleFilterClick = () => {
        if (selectedType.length > 0 && selectedIntensity.length > 0) return dispatch(sortByIntensityandType({selectedType, selectedIntensity}));
        if (selectedType.length > 0 && selectedIntensity.length === 0) return dispatch(sortByType(selectedType));
        if (selectedType.length === 0 && selectedIntensity.length > 0) return dispatch(sortByIntensity(selectedIntensity));
    };

    const handleOnDeleteIntensity = () => {
        setSelectedIntensity([]);
        dispatch(fetchAllLessons());
    }

    const handleOnDeleteType = () =>  {
        setSelectedType([]);
        dispatch(fetchAllLessons());
    }

    const handleDeleteAll = () => {
        setSelectedIntensity([]);
        setSelectedType([]);
        setAlphabetOrder(false);
        setEffortOrder(false);
        dispatch(fetchAllLessons());
    }

    
return (
    <div className= {style.BarContainer}>
        <div className={style.FilterBar}>
            <p>Ordenar por:</p>
            <div className={style.OptionsContainer}>
                <button className={(!alphabetOrder) ? (style.BtnOption) : (`${style.BtnOption} ${style.BtnOptionActive}`)} onClick={handleAlfabetoClick}><p>Alfabeto</p></button>

                <ul className={(selectedIntensity.length !== 0) ? `${style.BtnOptionType} ${style.BtnActive} `: (style.BtnOptionType) }>
                    <p onClick={handleIntensidadClick}>Intensidad</p>

                    <div className={style.DropMenuIntensityContainer}>
                        <ul className={style.DropMenuIntensity}>
                            {intensity.map((int,index) => {
                                return(
                                    <li key={index}>
                                        <button className={selectedIntensity.includes(String(int))? `${style.DropMenuBtn} ${style.Active}`: style.DropMenuBtn} onClick={handleIntensityClick} name={int}>
                                            {int}
                                        </button>
                                    </li>
                                )    
                            })}
                        </ul>
                        <button className={style.DeleteButton} onClick={handleOnDeleteIntensity}>Delete</button>
                    </div>

                </ul>

                <ul className={selectedType.length !== 0 ? `${style.BtnOptionType} ${style.BtnActive}` : style.BtnOptionType}>
                    <p onClick={handleTipoEjercicioClick}>Tipo de ejercicio</p>
                <div className={style.DropMenuContainer}>
                    <ul className={style.DropMenu}>
                        {lessonsAtributtes.map((atribute) => {
                            return(
                                <li key={atribute.id}>
                                    <button className={selectedType.includes(atribute.name) ? `${style.DropMenuBtn} ${style.Active}` : style.DropMenuBtn} onClick={handleTypeClick} name={atribute.name}>
                                        {atribute.name}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                    <button className={style.DeleteButton} onClick={handleOnDeleteType}>Delete</button>
                </div>
                </ul>
                
                    <img className={selectedType.length !== 0 || selectedIntensity.length !== 0 || alphabetOrder !== false || effortOrder !== false ? `${style.Trash} ${style.TrashActive}`: style.Trash} src={trashIcon} alt="Borrar filtros" onClick={handleDeleteAll} />
        
                <button className={style.FilterBtn} onClick={handleFilterClick}>filtrar</button>
            </div>
        </div>
    </div>
)
};

export default FilterBar;