import { useNavigate, useParams } from "react-router-dom";
import style from "./UserUpdate.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../utils/constants";
const UserUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    isAdmin: "",
    isMonitor: "",
  });
  useEffect(() => {
    axios.get(`${URL}/users/${id}`).then((response) => {
      console.log(response);
      setForm({
        fullName: response.data.user.fullName,
        email: response.data.user.email,
        phone: response.data.user.phone,
        isMonitor: response.data.user.isMonitor,
        isAdmin: response.data.user.isAdmin,
      });
    });
  }, [id]);

  const handleChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [field]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${URL}/users/update/${id}`, form);
    alert("Usuario actualizado correctamente");
    navigate("/profile");
  };

  return (
    <div className={style.general}>
      <form>
        <div className={style.container}>
          <div className={style.insignias}>
            {form.isAdmin ? <span> Admin</span> : <p></p>}
            {form.isMonitor ? <span> Profesor</span> : <p></p>}
          </div>

          <h1>{form.fullName}</h1>
          <div className={style.info}>
            <label>Nombre de usuario</label>
            <input
              type="text"
              name="fullName"
              defaultValue={form.fullName}
              onChange={handleChange}
            ></input>
          </div>

          <div className={style.info}>
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Ingrese nueva contraseña"
              onChange={handleChange}
            ></input>
          </div>

          <div className={style.info}>
            <label>Numero de teléfono</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            ></input>
          </div>

          <hr />
          <button className={style.ButtonSave} onClick={handleSubmit}>
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};
export default UserUpdate;
