import { useState, useEffect } from "react";
import style from "./Login.module.css";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        client_id:
          "1060018757623-sk8opucj3l59lu8u1e6qmsuggnqtgr0h.apps.googleusercontent.com",
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const clientId =
    "1060018757623-sk8opucj3l59lu8u1e6qmsuggnqtgr0h.apps.googleusercontent.com";
  const handleLogin = async () => {
    if (!email || !password) {
      alert("complete los campos");
    } else {
      try {
        const response = await axios.post("http://localhost:3001/users/login", {
          email,
          password,
        });
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
        console.log("entramos al catch");
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
  const onSuccess = async (response) => {
    const usuario = await axios.post("http://localhost:3001/users/login", {
      email: response.profileObj.email,
      password: response.profileObj.googleId,
    });
    console.log(usuario);
    if (usuario.data.login.success) {
      localStorage.setItem("token", usuario.data.login.token);
      window.location.href = "/";
    } else {
      const usuario = await axios.post("http://localhost:3001/users/create", {
        fullName: response.profileObj?.email.split("@")[0],
        email: response.profileObj?.email,
        password: response.profileObj?.googleId,
      });
      if (usuario.data.success) {
        localStorage.setItem("token", usuario.data.user.token);
        window.location.href = "/";
      } else {
        alert("error");
      }
    }
  };

  const onFailure = () => {
    console.log("error al verificar con google");
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

        <button className={style.ButtonLogIn} onClick={handleLogin}>
          Iniciar sesión
        </button>

        <GoogleLogin
          clientId={clientId}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy="single_host_policy"
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
