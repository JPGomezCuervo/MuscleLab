import { useState, useEffect } from "react";
import style from "./Login.module.css";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { URL, clientId } from "../../utils/constants";
import decodejwt from "../../utils/decodejwt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [camposCompletar, setCamposCompletar] = useState(false);

  const openModal = () => {
    setCamposCompletar(true);
  };

  const closeModal = () => {
    setCamposCompletar(false);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      //alert("complete los campos");
openModal();
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
    alert("error al verificar con google");
  };

  const handleKeyLogin = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <div className={style.BGContainer}>

      <div className={style.Container} onKeyDown={handleKeyLogin} onMouseEnter={() => setIsHovered(true)}>
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

        <button className={`${style.ButtonLogIn} ${isHovered && style.ButtonHover}`} onClick={handleLogin}>
          Iniciar sesión
        </button>

        <GoogleLogin
          clientId={clientId}
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
        <ReactModal
          className={style.modal}
          isOpen={camposCompletar}
          onRequestClose={closeModal}
        >
          <h2 className={style.text}>Debe completar todos los campos</h2>
          <button onClick={closeModal} className={style.SaveButton}>
    Aceptar
  </button> 
        </ReactModal>
        <hr></hr>

        <Link to="/register">
          <button className={style.ButtonCreate}>Crea una cuenta</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
