import style from "./EditTrainerDash.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserByID, selectUserByID } from "../../redux/features/usersSlice";
import arrowIcon from "../../assets/icons/arrow-yellow.png";
import { useParams } from "react-router-dom";

const EditTrainerDash = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const user = useSelector(selectUserByID);

    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phone: "",
    });

    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        phone: "",
    });

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInput({
            ...input,
            [name]: value,
        });

    };

    useEffect(() => {
        dispatch(fetchUserByID(id))
    }, [dispatch, id]);

    useEffect(() => {
        if (user) setInput({
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
        }
        );
    }, [user]);
    
    return (
        <>
        <form className={style.MainContainer}>
            <div className={style.Navigation}>
                <button>
                    <img className={style.ArrowIcon} src={arrowIcon} alt="" />
                </button>
                <h2>{user.fullName}</h2>
            </div>
            <div className={style.EditContainer}>
            <div className={style.Teacher}>{input.fullName}</div>

                <div className={style.Description}>
                    <label htmlFor='id'>ID</label>
                    <h3>{user.id}</h3> 
                </div>

                <div className={style.Description}>
                    <label htmlFor='name'>Nombre*</label>
                    <input placeholder='Nombre' value={input.fullName} type='text' id='name' name='fullName' onChange={handleInputChange}/>      
                </div>

                <div className={style.Description}>
                    <label htmlFor='email'>Email*</label>
                    <input placeholder='Nombre' value={input.email} type='text' id='email' name='email' onChange={handleInputChange} />      
                </div>

                <div className={style.Description}>
                    <label htmlFor='telefono'>Teléfono*</label>
                    <input placeholder='Nombre' value={input.phone} type='text' id='telefono' name='phone' onChange={handleInputChange}/>      
                </div>


            </div>
        </form>
        </>
    );

};

export default EditTrainerDash;