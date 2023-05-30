import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { selectAllMemberships, fetchAllMemberships } from "../../redux/features/membershipsSlice"
import { useSelector, useDispatch } from "react-redux";
import style from "./PasarelaPago.module.css";
import { URL } from "../../utils/constants";
import bicep from "../../assets/icons/Bicep.png"
import clock from "../../assets/icons/clock.png";
import dumbbell from "../../assets/icons/dumbbell.png"
import jwt_decode from "jwt-decode";

import ReactModal from "react-modal";

const ErrorModal = ({ isOpen, closeModal, errorMessage }) => {
    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Error"
        className={style.modal}
      >
        <h2 className={style.text}>Error</h2>
        <p className={style.text}>{errorMessage}</p>
        <button onClick={closeModal} className={style.Button}>Cerrar</button>
      </ReactModal>
    );
  };




const PasarelaPago = () => {

    const memberships = useSelector(selectAllMemberships)

    let id;

    const dispatch = useDispatch();
    const params = useParams();
    const selectedMembershipId = params.id;

    const selectedMembership = memberships.find((m) => m.id === selectedMembershipId);


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const crearProducto = (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token");
        //console.log(token)
        if (token) {
            const decodedToken = jwt_decode(token)
            id = decodedToken.id;
            // console.log(decodedToken)
        };
        // Realizar la lógica de pago para la membresía seleccionada
        if (selectedMembership) {
            const product = {
                id,
                name: selectedMembership.name,
                price: selectedMembership.price,
                benefits: selectedMembership.benefits,
                duration: selectedMembership.duration,
            };
            console.log(product)
            axios
                .post(`${URL}/payments/create_checkout`, product)
                .then((res) => {
                    console.log(res.data);
                    window.location.href = res.data.redirect_url;

                })
                .catch((error) => 

                setErrorMessage(error.response.data.error),
                 setModalIsOpen(true)
                )
              } else {

            console.log("No se encontró la membresía seleccionada");
        }
    };


    const closeModal = () => {
        setModalIsOpen(false);
        setErrorMessage('');
      };



    useEffect(() => {
        dispatch(fetchAllMemberships())
    }, [dispatch])

    const getImageUrl = (membershipId) => {
        switch (membershipId) {
            case "1":
                return bicep;
            case "2":
                return clock;
            case "3":
                return dumbbell;
            default:
                return "";
        }
    };


    return (
        <section>
            <div className={style.product}>
                <Link to="/">
                    <button className={style.Button}>Atras</button>
                </Link>


                {
                    selectedMembership
                        ?
                        <div className={style.card}>
                            <img src={getImageUrl(selectedMembershipId)} alt="Membership Image" className={style.img} />

                            <h2 className={style.text}>{selectedMembership.name}</h2>
                            <h2 className={style.text}>{selectedMembership.price}</h2>
                            <h2 className={style.text}>{selectedMembership.benefits}</h2>
                            <h2 className={style.text}>{selectedMembership.duration}</h2>
                            <button type="submit" onClick={crearProducto} className={style.Button}>
                                Pagar
                            </button>
                        </div>
                        :
                        <p>Membresía no encontrada</p>

                }



<ErrorModal isOpen={modalIsOpen} closeModal={closeModal} errorMessage={errorMessage} />

            </div>


        </section>
    );
}




export default PasarelaPago;


