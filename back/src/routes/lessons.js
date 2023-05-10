
const {Router}=require('express');


const server=Router();

/**Rutas de Clases
 * 
 *      get All y get Detail         
 */
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
const {getAllLessonsHandler, getDetailLessonHandler}=require('../handlers/lessonsHandler');

const server=Router();

server.post('/', async (req,res)=>{
    res.status(200);
});


server.get('/', getAllLessonsHandler);

server.get('/:id', getDetailLessonHandler);
=======
server.get('/:id', async (req,res)=>{
    res.status(200);

})


module.exports=server;