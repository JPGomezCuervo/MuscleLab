import style from "../Profile/Profile.module.css";
const UserUpdate = () => {


  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className={style.container}>
        <h1>{}</h1>
        <div className={style.info}>
          <h2>id</h2>
          <p>{}</p>
        </div>
        <div className={style.info}>
          <h2>Email</h2>
          <p>{}</p>
        </div>
        <div className={style.info}>
          <h2>Numero de teléfono</h2>
          {/* {phone ? <p>phone </p> : <p>No proporcionado</p>} */}
        </div>
        <hr />
      </div>
    </div>
  );
};
export default UserUpdate;
