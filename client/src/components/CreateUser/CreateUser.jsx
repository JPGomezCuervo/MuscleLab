import React, { useEffect, useState } from 'react'
//import { Link } from 'react-router-dom'
import style from './CreateUser.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, selectAllUsers } from '../../redux/features/usersSlice';
import validation from './validation';


 const CreateUser = () => {
  
    const [addUser, setAddUser] = useState({
      fullName: "",
      password: "",
      email: "",
      phone: "",
      isMonitor: false,
      isAdmin: false,
      statusMembershipIdStatus: null
    });
  
    const [errors, setErrors] = useState({
      fullName: '',
      password: '',
      email: '',
       phone: '',
      disabled: false
    });

    //console.log(errors)

    const [serverResponse, setServerResponse] = useState(true);

  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers);
  
  useEffect(() => {
    dispatch(fetchAllUsers());
     
  }, [serverResponse]);

   // eslint-disable-next-line react-hooks/exhaustive-deps
   
  //Mapping server response by Select All Users
  const mappedUsers = 
    users.users && users?.user.map(user => {
    return {
      email: user.email,
    };
  });

    //check if email exits!
const emailFiltered = mappedUsers && mappedUsers.filter((email) => mappedUsers.email === addUser.email);  
  
    
    const handleChange=(event)=>{
        const { id, value} = event.target
        const uniqueEmail = emailFiltered && emailFiltered.length
        
        setAddUser({ ...addUser, [id]: value})
        
        setErrors(
        validation({ 
            ...addUser,
            [id]: value,
            uniqueEmail
        })
        )
    }  

      //Create user
  const createUserHandler = (event) => {
    
    let text = "Se creara un nuevo usuario!! \nPulse OK o Cancelar.";
    if (window.confirm(text) === true) {
      fetch("https://musclelabii.onrender.com/users/create/", 
      { method: "POST",
        body: JSON.stringify(addUser),
        headers:{"Content-type": "application/json; charset=UTF-8"}      
      })
        .then((response) => setServerResponse(response))
        .catch((error) => setServerResponse(error));

      alert("Creado con exito!");
    } else {
      alert("Cancelado por el usuario");
    }
  };
    
    return (
    
        <div className={style.containerCuerpoPpal}>
           <a href='https://muscle-lab-six.vercel.app/dashboard/usuarios'><button className={style.btnBack}>Volver usuarios</button></a>
        <div className={style.formContainer}>
        <h2 className={style.title1}>Crear usuario:</h2>
          <form className={style.form} onSubmit={(e) => createUserHandler(e)}>
            
            <div className={style.campos}>
              
              <label className={style.label} htmlFor="name">
                Nombre completo*:{" "}
              </label>
              
              <p className={style.error}>{errors.fullName && errors.fullName}</p>
              
              <input
                type="text"
                id="fullName"
                autoComplete="off"
                placeholder="*Nombre completo"
                value={addUser.fullName}
                onChange={(e) => handleChange(e)}
                className={style.inputName}
              />
               
               <label className={style.label} htmlFor="password">
                Password:{" "}
              </label>
              
              <p className={style.error}>{errors.password && errors.password}</p>
              
              <input
                type="password"
                id="password"
                autoComplete="off"
                placeholder="Password"
                value={addUser.password}
                onChange={(e) => handleChange(e)}
                className={style.inputPassword}
              />
              <label className={style.label} htmlFor="email">
                Email*:{" "}
              </label>
              <p className={style.error}>
                {errors.email && errors.email}
              </p>
              <input
                type="email"
                id="email"
                placeholder="*Email..."
                autoComplete="off"
                value={addUser.email}
                onChange={(e) => handleChange(e)}
                className={style.inputEmail}
              />
              <label className={style.label} htmlFor="phone">
                Telefono*:{" "}
              </label>
                <p className={style.error}>
                  {errors.phone && errors.phone}
                </p>
              <input
                type="text"
                id="phone"
                autoComplete="off"
                placeholder="*Telefono"
                value={addUser.phone}
                onChange={(e) => handleChange(e)}
                className={style.inputPhone}
              />
              
              {errors.disabled ? 
                <p className={style.errorForm}>
                    ⚠️ Datos incompletos! ⚠️</p> 
                            : <p className={style.validForm}>Todo en orden para dar de alta! ✔️</p> }
              <button 
                className={style.btn} 
                type="submit"
                disabled={errors.disabled}
                >
                Agregar!
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}
export default CreateUser