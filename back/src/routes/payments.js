const { Router } = require("express");
const server = Router();
const Stripe = require('stripe');
const stripe= new Stripe("sk_test_51NBkBJFPcDe3Fz6KjLlzjI35wfptX5dwAkeq7TnXdPy9YEBmqirmm4YdUIktaK82RmXCH8WU1dxyp6cR5G6CbMMM00zSOxlAwo");



server.post('/checkout',async (req,res)=>{
    const {id, amount, description}=req.body;
    const payment= await stripe.paymentIntents.create({
        amount: amount,
        currency: "USD",
        description: description,
        payment_method: id,
        confirm: true
    });
    res.status(200).json(payment);
});

module.exports = server;