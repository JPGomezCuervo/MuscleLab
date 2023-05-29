import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {selectAllMemberships} from "../../redux/features/membershipsSlice"
import { useSelector } from "react-redux";


const PasarelaPago = ()=>{

    const memberships = useSelector(selectAllMemberships)
    const [product, setProduct] = useState({
        name: "",
        price: "",
        benefits: "",
        duration:"",
    });

    const navigate= useNavigate();

    const crearProducto =  (event) => {
            event.preventDefault();
       // alert(product)
        console.log("entree")
        //mandar email del user loggeado con TOKEN, cmabiar en el back
         axios.post("http://localhost:3001/payments/create_checkout", product)
         .then((res)=> {
            console.log(res.data)
            window.location.href= res.data.redirect_url;
        }
            )

         .catch(error=> console.log(error))
    }
const handleChange= (e)=>{
   setProduct({
    ...product,
       [e.target.name]: e.target.value
    })
}

console.log(product)

    return (
        <section>
            <div className="product">
                <img
                    src="https://i.imgur.com/EHyR2nP.png"
                    alt="The cover of Stubborn Attachments"
                />
                <div className="description">
                    <h3 name="name">{memberships.name}</h3>
                    <h5 name="price">{memberships.price}</h5>
                    <h3 name="benefits">{memberships.benefits}</h3>
                    <h3 name="duration">{memberships.duration}</h3>
                </div>
            </div>
          
            <form >
                <button  type="submit" onClick={crearProducto} onChange={handleChange}>
                    Pagar
                </button>
            </form>
        </section>
    );
}





export default PasarelaPago;


