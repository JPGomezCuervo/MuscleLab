const { Router } = require("express");
const server = Router();
const stripe = require('stripe')('sk_test_51NBkBJFPcDe3Fz6KjLlzjI35wfptX5dwAkeq7TnXdPy9YEBmqirmm4YdUIktaK82RmXCH8WU1dxyp6cR5G6CbMMM00zSOxlAwo');



server.post('/create_checkout',async (req,res)=>{
    //res.status(200).json({msg:"Hola"});
    const {name, benefits, price}=req.body;
    console.log(name, benefits, price);
    const charge=Number(price)*100;
    console.log(charge);
    const session=await stripe.checkout.sessions.create({
        line_items:[{
            price_data:{
                currency: "USD",
                product_data:{
                    name:name,
                    description:benefits,
                },
                unit_amount:charge,
            },
            quantity: 1
        }],
        mode:'payment',
        success_url: 'https://localhost:3000/profile',
        cancel_url:'https://localhost:3000/sedes'
    });
    console.log(session.url);
    res.status(303).redirect(session.url);
    
});

module.exports = server;