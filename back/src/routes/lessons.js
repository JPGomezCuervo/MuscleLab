const { Router } = require('express');
const {getAllLessonsHandler, getDetailLessonHandler}=require('../handlers/lessonsHandler');

const server=Router();

server.post('/', async (req,res)=>{
    res.status(200);
});

server.get('/', getAllLessonsHandler);

server.get('/:id', getDetailLessonHandler);

module.exports=server;