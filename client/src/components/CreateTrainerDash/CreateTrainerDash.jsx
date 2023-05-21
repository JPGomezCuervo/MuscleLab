import style from './CreateTrainerDash.module.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { URL } from '../../utils/constants';
import arrowIcon from "../../assets/icons/arrow-yellow.png";
import checkIcon from '../../assets/icons/check.png';
import validations from './Validations/index';
import axios from 'axios';

const CreateTrainerDash = () => {

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
        isAdmin:"",
        isMonitor: ""
    });

    const [allowSubmit, setAllowSubmit] = useState(false);
    const [message, setMessage] = useState("");
    const [serverResponse, setServerResponse] = useState("");

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInput({...input, [name]: value,});
        setErrors(validations(value,errors,name))
    };


    const handleConfirmModify = (event) => {
        event.preventDefault();
        setMessage("¿Estás seguro de que quieres crear tu profesor?")
    }

    const handleConfirmarClick = (event) =>{
        event.preventDefault();
        axios.post(`${URL}/users/create`, input)
        .then((res) => {
            console.log(res);
            setServerResponse(res.data.message)
        })
        .catch((error) => {
            console.log(error);
            setServerResponse(error.data.message)
        })
    }

    const handleVolverClick = (event) => {
        event.preventDefault();
        setMessage("");
        setServerResponse("");
    }

    useEffect(() =>{
        setAllowSubmit(Object.values(input).every((item) => item !== "") && Object.values(errors).every((item) => item === ""))
    }, [input, errors])

    return(
        <form className={style.MainContainer}>
            <div className={style.Navigation}>
                <a href='http://localhost:3000/dashboard/profesores'>
                    <img className={style.ArrowIcon} src={arrowIcon} alt="" />
                </a>
                <h2>Create Teacher</h2>
            </div>
            <div className={style.EditContainer}>
            <div className={style.Teacher}>{input.fullName}</div>

                <div className={style.Description}>
                    <label htmlFor='name'>Nombre*</label>
                    <input placeholder='Nombre' value={input.fullName} type='text' id='name' name='fullName' onChange={handleInputChange}/>

                    {errors.fullName && <p>{errors.fullName}</p>}  
                </div>

                <div className={style.Description}>
                    <label htmlFor='email'>Correo electrónico*</label>
                    <input placeholder='Correo electrónico' value={input.email} type='text' id='email' name='email' onChange={handleInputChange} />      

                    {errors.email && <p>{errors.email}</p>}
                </div>

                <div className={style.Description}>
                    <label htmlFor='email'>Contraseña*</label>
                    <input placeholder='Correo electrónico' value={input.password} type='text' id='password' name='password' onChange={handleInputChange} />      

                    {errors.password && <p>{errors.password}</p>}
                </div>

                <div className={style.Description}>
                    <label htmlFor='telefono'>Teléfono*</label>
                    <input placeholder='Telefono' value={input.phone} type='text' id='telefono' name='phone' onChange={handleInputChange}/>

                    {errors.phone && <p>{errors.phone}</p>}   
                </div>

                <div className={style.LastDescription}>
                    <div className={style.Selector}>
                        <h2>Es profesor?</h2>
                        <select name= "isMonitor" id= "" onChange={handleInputChange}> 
                            <option value="Seleccione" selected={true}>
                                Seleccione
                            </option>
                            <option value= {true}>
                                Si
                            </option>

                            <option value= {false}>
                                No
                            </option>
                        </select>
                        {errors.isMonitor && <p>{errors.isMonitor}</p> }
                    </div>

                    <div className={style.Selector}>
                        <h2>Es administrador?</h2>
                        <select name="isAdmin" id="" onChange={handleInputChange} > 
                            <option value="Seleccione" selected={true}>
                                Seleccione
                            </option>
                            <option value = {true}>
                                Si
                            </option>

                            <option value = {false}>
                                No
                            </option>
                        </select>
                        {errors.isAdmin && <p>{errors.isAdmin}</p> }
                    </div>
                </div>


                <div className={style.Description}>
                    <button className={allowSubmit === true ? style.SaveButton:`${style.SaveButton} ${style.Disable}`} disabled = {!allowSubmit} onClick={handleConfirmModify} >
                        Guardar
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
    )
}

export default CreateTrainerDash