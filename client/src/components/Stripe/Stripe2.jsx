import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ProductDisplay = () => {

    const [product, setProduct] = useState({
        name: "Plus",
        price: "20",
        benefits: "cositas",
        // duration:"",
    });

    const navigate= useNavigate();

    const crearProducto =  (event) => {
            event.preventDefault();
       // alert(product)
        console.log("entree")
         axios.post("http://localhost:3001/payments/create_checkout", product)
         .then((res)=> {
            console.log(res.data)
            window.location.href= res.data.redirect_url;
        }
            )

         .catch(error=> console.log(error))
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
                    <h3>{product.name}</h3>
                    <h5>{product.price}</h5>
                    <h3>{product.benefits}</h3>
                </div>
            </div>
          
            <form >
                <button  type="submit" onClick={crearProducto} >
                    Checkout
                </button>
            </form>
        </section>
    );
}
export default ProductDisplay;