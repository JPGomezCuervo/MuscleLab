const { Router } = require("express");
const server = Router();
const stripe = require('stripe')('sk_test_51NBkBJFPcDe3Fz6KjLlzjI35wfptX5dwAkeq7TnXdPy9YEBmqirmm4YdUIktaK82RmXCH8WU1dxyp6cR5G6CbMMM00zSOxlAwo');



server.post('/create_checkout',async (req,res)=>{
    res.status(200).json({msg:"Hola"});
    // const session=await stripe.checkout.sessions.create({
    //     line_items:[{

    //     }]
    // })
    
});

module.exports = server;