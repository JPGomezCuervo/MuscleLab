import { useState } from "react";
import style from "./Login.module.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("complete los campos");
    } else {
      try {
        const response = await axios.post(
          "https://musclelabii.onrender.com/users/login",
          {
            email,
            password,
          }
        );

        if (response.data.login.success) {
          window.location.href = "/";
        } else if (
          response.data.login.message ===
          "No se encontró un usuario con ese email"
        ) {
          setEmailError(response.data.login.message);
        } else {
          setPasswordError(response.data.login.message);
        }
      } catch (error) {
        alert("error del servidor");
      }
    }
  };

  //FUNCIONES
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(""); // Eliminar el mensaje de error al escribir en el campo de correo electrónico
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(""); // Eliminar el mensaje de error al escribir en el campo de contraseña
  };
  return (
    <div className={style.BGContainer}>
      <div className={style.Container}>
        <h1>Inicia Sesión</h1>
        <h2 className={style.Description}>Para continuar con MuscleLab</h2>

        <input
          type="text"
          name="email"
          placeholder="Correo"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <p className={style.ErrorMessage}>{emailError}</p>}

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <p className={style.ErrorMessage}>{passwordError}</p>}

        <h2 className={style.ForgotPassword}>¿Olvidaste tu contraseña?</h2>

        <button className={style.ButtonLogIn} onClick={handleLogin}>
          Iniciar sesión
        </button>

        <button className={style.ButtonCreate}>Crea una cuenta</button>
      </div>
    </div>
  );
};

export default Login;