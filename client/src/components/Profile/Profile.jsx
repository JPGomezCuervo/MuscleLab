import jwt_decode from "jwt-decode";
const Profile = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const isAdmin = decodedToken.isAdmin;
  const nombre = decodedToken.nombre;
  const id = decodedToken.id;

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
