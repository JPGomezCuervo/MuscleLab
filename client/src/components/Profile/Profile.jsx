import decodeJwt from "../../utils/decodejwt";
const Profile = () => {
  const token = localStorage.getItem("token");
  const decoded = decodeJwt(token);
  const isAdmin = decoded.payload.isAdmin;
  const nombre = decoded.payload.nombre;
  const id = decoded.payload.id;

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <p>NIY</p>
      <p>Nombre: {nombre}</p>
      <p>id: {id}</p>
      <p>Eres admin :{isAdmin ? <a> Si</a> : <a> No</a>}</p>
    </div>
  );
};
export default Profile;
