import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { selectAllMemberships, fetchAllMemberships } from "../../redux/features/membershipsSlice"
import { useSelector, useDispatch } from "react-redux";
import style from "./PasarelaPago.module.css";
import { URL } from "../../utils/constants";



const PasarelaPago = () => {

    const memberships = useSelector(selectAllMemberships)

    console.log(memberships)
    const [product, setProduct] = useState({
        name: "",
        price: "",
        benefits: "",
        duration: "",
    });

    const [selectedMembershipId, setSelectedMembershipId] = useState("");


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const crearProducto = (event) => {
        event.preventDefault();
        // alert(product)
        console.log("entree")
        //mandar email del user loggeado con TOKEN, cmabiar en el back
         const selectedMembership = memberships.find((m) => m.id === selectedMembershipId);

  if (selectedMembership) {
    // Realiza la lógica de pago para la membresía seleccionada
    const product = {
      name: selectedMembership.name,
      price: selectedMembership.price,
      benefits: selectedMembership.benefits,
      duration: selectedMembership.duration,
    }
        axios.post(`${URL}/payments/create_checkout`, product)
            .then((res) => {
                console.log(res.data)
                window.location.href = res.data.redirect_url;
            })
            .catch(error => console.log(error))
    } else {
    console.log("No se encontró la membresía seleccionada");
  }
};

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    console.log(product)

    useEffect(() => {
        dispatch(fetchAllMemberships())
    }, [dispatch])


    return (
        <section>
            <div className={style.product}>
                <img
                    src="https://i.imgur.com/EHyR2nP.png"
                    alt="The cover of Stubborn Attachments"
                />

                {
                    memberships
                        ?
                        memberships.map((m) => (
                            <div key={m.id}>
                                <h3>{m.name}</h3>
                                <h5>{m.price}</h5>
                                <h3>{m.benefits}</h3>
                                <h3>{m.duration}</h3>
                                <button onClick={() => setSelectedMembershipId(m.id)}>Seleccionar</button>
                            </div>
                        ))

                        :
                        <p>Loading</p>

                }
                <div className="description">

                </div>
            </div>

            <form >
                <button type="submit" onClick={crearProducto} onChange={handleChange}>
                    Pagar
                </button>
            </form>
        </section>
    );
}




export default PasarelaPago;


