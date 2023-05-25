import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Stripe from "../Stripe/Stripe";

const stripePromise = loadStripe("pk_test_51NBkBJFPcDe3Fz6KkGQtdIbzgD3xZ5woXRgSC0H8e6FA2LAjFtVbF4jsO0mrWuJn6n4UvEvzevRn4WFoYkjMXMyI001wbQmVlN");


const StripeRender = ()=>{

    return (
        <Elements stripe={stripePromise}>
          <div className="container p-4">
            <div className="row h-100">
              <div className="col-md-4 offset-md-4 h-100">
                <Stripe />
              </div>
            </div>
          </div>
        </Elements>
      );


}


export default StripeRender;