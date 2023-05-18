import { useState } from "react";
import style from "./Login.module.css";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("el email es: " + email, "la password es: " + password);
    try {
      const response = await axios.post(
        "https://musclelabii.onrender.com/users/login",
        {
          email,
          password,
        }
      );
      console.log("el response es:", response.data);
      if (response.data === "logeado con exito") {
        window.location.href = "/";
      } else if (response.data === "contraseña incorrecta") {
        alert("contraseña incorrecta");
      } else {
        alert("hubo un error");
      }
    } catch (error) {
      alert(error.message);
    }
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
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

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
