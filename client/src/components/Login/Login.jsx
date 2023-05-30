import { useState, useEffect } from "react";
import style from "./Login.module.css";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { URL, clientId } from "../../utils/constants";
import decodejwt from "../../utils/decodejwt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const Login = () => {
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async () => {


    console.log("clickaste iniciar con: ", email, password);
    if (!email || !password) {
      alert("complete los campos");
    } else {
      try {
        const response = await axios.post(`${URL}/users/login`, {
          email,
          password,
        });
        console.log(response);
        if (response.data.login.success) {
          localStorage.setItem("token", response.data.login.token);
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
        alert(error.message);
      }
    }
  };

  //FUNCIONES
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  const onSuccess = async (credentialResponse) => {
    if (credentialResponse.credential) {
      const { payload } = decodejwt(credentialResponse.credential);

      const usuario = await axios.post(`${URL}/users/login`, {
        email: payload.email,
        password: payload.email,
      });
      if (usuario.data.login.success) {
        localStorage.setItem("token", usuario.data.login.token);
        window.location.href = "/";
      } else {
        const usuario = await axios.post(`${URL}/users/create`, {
          fullName: payload.name,
          email: payload.email,
          password: payload.email,
        });

        if (usuario.data.success) {
          localStorage.setItem("token", usuario.data.user.token);
          window.location.href = "/";
        } else {
          alert("Error al validar con Google");
        }
      }
    }
  };

  const onFailure = () => {
    console.log("error al verificar con google");
  };
  const handleKeyLogin = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <div className={style.BGContainer}>
      <div className={style.Container} onKeyDown={handleKeyLogin} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <h1>Inicia Sesión</h1>
        <h2 className={style.Description}>Para continuar con MuscleLab</h2>

        <input
          type="text"
          name="email"
          placeholder="Correo"
          value={email}
          onChange={handleEmailChange}
          onKeyDown={handleKeyLogin}
        />
        {emailError && <p className={style.ErrorMessage}>{emailError}</p>}

        <div className={style.PasswordInput}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
            className={`${style.Input} ${style.PasswordInput}`}
            
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className={style.PasswordIcon}
            onClick={togglePasswordVisibility}
          />
        </div>
        {passwordError && <p className={style.ErrorMessage}>{passwordError}</p>}

        <button className={`${style.ButtonLogIn} ${isHovered && style.ButtonHover}`}>
          Iniciar sesión
        </button>

        <GoogleLogin
          clientId={clientId}
          onSuccess={onSuccess}
          onFailure={onFailure}
        />

        <hr></hr>

        <Link to="/register">
          <button className={style.ButtonCreate}>Crea una cuenta</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
