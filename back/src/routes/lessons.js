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
})

module.exports=server;