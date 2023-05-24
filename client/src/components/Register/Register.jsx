import style from "../Login/Login.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

const Register = () => {
  const clientId =
    "1060018757623-sk8opucj3l59lu8u1e6qmsuggnqtgr0h.apps.googleusercontent.com";
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  const changeHandler = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    // const fieldErrors = validate(field, value);
    // setErrors({ ...errors, [field]: fieldErrors[field] });
    setForm({ ...form, [field]: value });
  };

  const handleRegister = async () => {
    console.log(form.email.split("@")[0]);
    try {
      const response = await axios.post("http://localhost:3001/users/create", {
        fullName: form.email.split("@")[0],
        password: form.password,
        email: form.email,
      });
      console.log(response.data);
      if (response.data.success) {
        alert("Usuario creado con exito");
        localStorage.setItem("token", response.data.user.token);
        window.location.href = "/";
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className={style.BGContainer}>
      <div className={style.Container}>
        <h1>Regístrate</h1>
        <h2 className={style.Description}>Para continuar con MuscleLab</h2>
        {/* {fullNameError && <p className={style.ErrorMessage}>{fullNameError}</p>} */}
        <input
          type="text"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={changeHandler}
        />
        {emailError && <p className={style.ErrorMessage}>{emailError}</p>}
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={changeHandler}
        />
        {passwordError && <p className={style.ErrorMessage}>{passwordError}</p>}

        {/* {phoneError && <p className={style.ErrorMessage}>{phoneError}</p>} */}

        <button className={style.ButtonLogIn} onClick={handleRegister}>
          Regístrate
        </button>

        <hr />
        <Link to="/login">
          <button className={style.ButtonCreate}>inicia sesión</button>
        </Link>
      </div>
    </div>
  );
};
export default Register;
