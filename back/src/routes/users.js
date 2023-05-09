const {Router}=require('express');


const server=Router();
/** Rutas de Usuarios
 *          get All y get by ID*/
server.get('/', async (req,res)=>{
    res.status(200).json({msg:'Hola'});
});

server.get('/:id', async (req,res)=>{
    res.status(200).json({msg:'Hola'});
})

/**         create user */

server.post('/', async (req,res)=>{
    res.status(200).json({msg:'Hola'});
})

/**          update user*/

server.put('/:id', async (req,res)=>{
    res.status(200).json({msg:'Hola'});
})

/**   delete from DB an user*/

server.delete('/:id', async (req,res)=>{
    res.status(200).json({msg:'Hola'});
})
module.exports=server;