const { Router } = require('express');

const server=Router();

server.post('/', async (req,res)=>{
    res.status(200);
})

server.get('/', async (req,res)=>{
    res.status(200);
});

server.get('/:id', async (req,res)=>{
    res.status(200);
})

module.exports=server;