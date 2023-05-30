import style from "./EditTrainerDash.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserByID, selectUserByID } from "../../redux/features/usersSlice";
import { URL } from '../../utils/constants';
import arrowIcon from "../../assets/icons/arrow-yellow.png";
import { useParams } from "react-router-dom";
import validations from './Validations/index';
import checkIcon from '../../assets/icons/check.png';
import axios from 'axios'

const EditTrainerDash = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const usuario = useSelector(selectUserByID);
    const user = usuario?.membresia ? usuario.detalle : usuario;

    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phone: "",
        isAdmin:"",
        isMonitor: "",
        password:""
    });

    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        phone: "",
    });

    const [allowSubmit, setAllowSubmit] = useState(true);

    const [message, setMessage] = useState("")
    const [serverResponse, setServerResponse] = useState("")


    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInput({
            ...input,
            [name]: value,
        });
        setErrors(validations(value,errors,name))

    };

    const handleSelectChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setInput({...input, [name]: value})
        
    }

    const handleConfirmModify = (event) => {
        event.preventDefault();
        setMessage("¿Estás seguro de que quieres modificar tu perfil?")
    }

    const handleConfirmRemove = (event) => {
        event.preventDefault();
        setMessage("¿Estás seguro de que quieres eliminar tu perfil?")
    }

    const handleVolverClick = (event) => {
        event.preventDefault();
        setMessage("");
        setServerResponse("");

    }

    const handleConfirmarClick = (event) =>{
        //Pide lessons para editar, mi pregunta es si en la tabla lecciones, ya debe existir la relacion con profesores
        event.preventDefault();
        if(message.includes("modificar")) {
            console.log(JSON.stringify(input))
            axios.put(`${URL}/users/update/${id}`, input)
            .then((res) => {
                console.log(res);
                setServerResponse(res.data)
            })
            .catch((error) => {
                console.log(error);
                setServerResponse(error.data)
            }
            )
        } else {
            axios.delete(`${URL}/users/delete/${id}`)
            .then((res) => {
                console.log(res);
                setServerResponse(res.data)
            })
            .catch((error) => {
                console.log(error);
                setServerResponse(error.data)
            }
            )
        }
    }

    useEffect(() => {
        dispatch(fetchUserByID(id))
    }, [dispatch, id]);

    useEffect(() => {
        if (user) setInput({
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            password: user.password
        }
        );
    }, [user]);

    useEffect(() =>{
        setAllowSubmit(Object.values(errors).every((item) => item === ""))
    }, [errors])
    
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

                    {errors.fullName && <p>{errors.fullName}</p>}  
                </div>

                <div className={style.Description}>
                    <label htmlFor='email'>Correo electrónico*</label>
                    <input placeholder='Nombre' value={input.email} type='text' id='email' name='email' onChange={handleInputChange} />      

                    {errors.email && <p>{errors.email}</p>}
                </div>

                <div className={style.Description}>
                    <label htmlFor='telefono'>Teléfono*</label>
                    <input placeholder='teléfono' value={input.phone} type='text' id='telefono' name='phone' onChange={handleInputChange}/>

                    {errors.phone && <p>{errors.phone}</p>}   
                </div>

                <div className={style.LastDescription}>
                    <div className={style.Selector}>
                        <h2>Es profesor?</h2>
                        <select name= "isMonitor" id= "" onChange={handleSelectChange}>
                            <option value= {user.isMonitor}>
                                {user.isMonitor === true ? "Si": "No" }
                            </option>

                            <option value= {!user.isMonitor}>
                                {!user.isMonitor === false ? "No": "Si" }
                            </option>
                        </select>
                    </div>

                    <div className={style.Selector}>
                        <h2>Es administrador?</h2>
                        <select name="isAdmin" id="" onChange={handleSelectChange} >
                            <option value = {user.isAdmin}>
                                {user.isAdmin === true ? "Si": "No" }
                            </option>

                            <option value = {!user.isAdmin}>
                                {!user.isAdmin === false ? "No": "Si" }
                            </option>
                        </select>
                    </div>
                </div>


                <div className={style.Description}>
                    <button className={allowSubmit === true ? style.SaveButton:`${style.SaveButton} ${style.Disable}`} disabled = {!allowSubmit} onClick={handleConfirmModify} >
                        Guardar
                    </button>

                    <button className={style.DeleteButton} onClick = {handleConfirmRemove}>
                        Eliminar
                    </button>
                </div>
            </div>

            {message && 
                <div>
                    <div className={style.AdvertiseContainer} ></div>
                    <div className={style.Advertise}>
                        <h1>{message}</h1> 
                        <div>
                            {message &&<button className={style.AdvertiseButton1} onClick={handleConfirmarClick}>Confirmar</button>}
                            {message && <button className={style.AdvertiseButton2} onClick={handleVolverClick}>Volver</button>}
                        </div>
                    </div>
                </div>
                }

            {serverResponse && 
                <div>
                    <div className={style.AdvertiseContainer} ></div>
                    <div className={style.Advertise}>
                        <h1>{serverResponse}</h1>
                        <img className={style.CheckIcon} src={checkIcon} alt="" />
                        <div>
                            <a className={style.AdvertiseButton3} href='http://localhost:3000/dashboard/profesores'>
                                Volver a Profesores
                            </a>
                        </div>
                    </div>
                </div>
                }
        </form>
        </>
    );

};

export default EditTrainerDash;