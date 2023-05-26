const { Router } = require('express');
const server = Router();


server.post('/create', (req, res) => {
    res.status(200).send("NIY: estoy en la ruta para crear una nueva review")
});

module.exports = server;