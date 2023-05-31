import React from "react";
import { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import style from "./Stripe.module.css";
import { URL } from "../../utils/constants";

// const stripePromise = loadStripe("pk_test_51NBkBJFPcDe3Fz6KkGQtdIbzgD3xZ5woXRgSC0H8e6FA2LAjFtVbF4jsO0mrWuJn6n4UvEvzevRn4WFoYkjMXMyI001wbQmVlN");


const Stripe  = ()=>{

    const stripe = useStripe();
    const elements = useElements();
  
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      setLoading(true);
  console.log(error)
      if (!error) {
        // console.log(paymentMethod)
        const { id } = paymentMethod;
        try {
          const { data } = await axios.post(
            `${URL}/payments/checkout`,
            {
              id,
              amount: 10000, //cents
            }
          );
  
          elements.getElement(CardElement).clear();
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
    };
  
    console.log(!stripe || loading);
  
    return (
        <>
    <div className={style.content}>

      <form className="card card-body" onSubmit={handleSubmit}>
        {/* Product Information */}
        <img
          src="algo"
          alt="Corsair Gaming Keyboard RGB"
          className="img-fluid"
          />
  
        <h3 className="text-center my-2">Price: 100$</h3>
  
        {/* User Card Input */}
        <div className="form-group">
          <CardElement />
        </div>
  
        <button disabled={!stripe} className="btn btn-success">
          {loading ? (
              <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
              "Buy"
              )}
        </button>
      </form>
             
          </div>
              </>
    );
  };
  





export default Stripe;