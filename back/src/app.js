const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const server = express();
const stripe = require('stripe')('sk_test_51NBkBJFPcDe3Fz6KjLlzjI35wfptX5dwAkeq7TnXdPy9YEBmqirmm4YdUIktaK82RmXCH8WU1dxyp6cR5G6CbMMM00zSOxlAwo');
const endpointSecret="whsec_b5082ce3c79b262f7f9305bfb3bb1ec1680ba313ddfb35ee84b9cba78f7403cc";
const fulfillOrder=require('./Controllers/Payments/fulfillPayment.js');
let event;


server.name = "API";

server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

  
  server.post('/webhook', bodyParser.raw({type: 'application/json'}),async (req,res)=>{
    const payload=req.body;
    //const payloadBuffer= Buffer.from(JSON.stringify(payload));
    const sig = req.headers['stripe-signature'];

  try {
    event = stripe.webhooks.constructEvent(payload, sig);
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ['line_items'],
      }
      );
      
      // Fulfill the purchase...
      //descomentar para hacer efectiva las relaciones entre usuarios y sus membresias (terminar esas realciones)
      try {
        fulfillOrder(sessionWithLineItems);
      } catch (error) {
        res.status(400).json({error:error.message});
      }
    }
    res.status(200).end();
    
  })
  
  server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
  server.use(bodyParser.json({ limit: "50mb" }));
  server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
