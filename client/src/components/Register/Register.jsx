import style from "../Login/Login.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { validate } from "./validate";
import { URL } from "../../utils/constants";
const Register = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const fieldErrors = validate(field, value);
    setErrors({ ...errors, [field]: fieldErrors[field] });
    setForm({ ...form, [field]: value });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${URL}/users/create`, {
        fullName: form.email.split("@")[0],
        password: form.password,
        email: form.email,
      });
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
        
        <input
          type="text"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={changeHandler}
        />
        {errors.email && <p className={style.ErrorMessage}>{errors.email}</p>}
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={changeHandler}
        />
        {errors.password && <p className={style.ErrorMessage}>{errors.password}</p>}

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
