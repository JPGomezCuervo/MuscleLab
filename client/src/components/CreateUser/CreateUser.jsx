import React, { useEffect, useState } from 'react'
//import { Link } from 'react-router-dom'
import styles from './CreateUser.module.css'
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
    
        <div className={styles.containerCuerpoPpal}>
           <a href='http://localhost:3000/dashboard/usuarios'><button className={styles.btnBack}>Volver usuarios</button></a>
        <div className={styles.formContainer}>
        <h2 className={styles.title1}>Crear usuario:</h2>
          <form className={styles.form} onSubmit={(e) => createUserHandler(e)}>
            
            <div className={styles.campos}>
              
              <label className={styles.label} htmlFor="name">
                Nombre completo*:{" "}
              </label>
              
              <p className={styles.error}>{errors.fullName && errors.fullName}</p>
              
              <input
                type="text"
                id="fullName"
                autoComplete="off"
                placeholder="*Nombre completo"
                value={addUser.fullName}
                onChange={(e) => handleChange(e)}
                className={styles.inputName}
              />
               
               <label className={styles.label} htmlFor="password">
                Password:{" "}
              </label>
              
              <p className={styles.error}>{errors.password && errors.password}</p>
              
              <input
                type="password"
                id="password"
                autoComplete="off"
                placeholder="Password"
                value={addUser.password}
                onChange={(e) => handleChange(e)}
                className={styles.inputPassword}
              />
              <label className={styles.label} htmlFor="email">
                Email*:{" "}
              </label>
              <p className={styles.error}>
                {errors.email && errors.email}
              </p>
              <input
                type="email"
                id="email"
                placeholder="*Email..."
                autoComplete="off"
                value={addUser.email}
                onChange={(e) => handleChange(e)}
                className={styles.inputEmail}
              />
              <label className={styles.label} htmlFor="phone">
                Telefono*:{" "}
              </label>
                <p className={styles.error}>
                  {errors.phone && errors.phone}
                </p>
              <input
                type="text"
                id="phone"
                autoComplete="off"
                placeholder="*Telefono"
                value={addUser.phone}
                onChange={(e) => handleChange(e)}
                className={styles.inputPhone}
              />
              
              {errors.disabled ? 
                <p className={styles.errorForm}>
                    ⚠️ Datos incompletos! ⚠️</p> 
                            : <p className={styles.validForm}>Todo en orden para dar de alta! ✔️</p> }
              <button 
                className={styles.btn} 
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