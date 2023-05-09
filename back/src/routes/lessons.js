<<<<<<< HEAD
const {Router}=require('express');


const server=Router();

/**Rutas de Clases
 * 
 *      get All y get Detail         
 */

server.get('/', async (req,res)=>{
    res.status(200).json({msg:'Hola'});
})

server.get('/:id', async (req,res)=>{
    res.status(200).json({msg:'Hola'})
})
/**     create clase */
server.post('/', async(req,res)=>{
    res.status(200).json({msg:'Hola'})
})

/**     update clase */

server.put('/', async (req,res)=>{
    res.status(200).json({msg:'Hola'})
})

/**     delete Db clase */

server.delete('/', async (req,res)=>{
    res.status(200).json({msg:'Hola'})
=======
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
>>>>>>> f73914104b97675ad92d3103a3628935971e5068
})

module.exports=server;