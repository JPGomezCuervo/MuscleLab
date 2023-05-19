const { Router } = require("express");
const server = Router();
const createNewLesson = require("../Handlers/Lessons/createLessonHandler");
const deleteMyLesson = require("../Handlers/Lessons/deleteLessonHandler");
const {getAllLessonsHandler}=require('../Handlers/Lessons/getAllLessonsHandler');
const {getDetailLessonHandler}=require('../Handlers/Lessons/getDetailLessonHandler');
const getDeletedLessons=require('../Handlers/Lessons/getDeletedLessonsHandler');
const restoreDeletedLesson = require("../Handlers/Lessons/restoreDeletedLessonsHandler");
const updateLessons = require('../Handlers/Lessons/updateLessonHandler');
const updateLessonsDetails = require('../Handlers/Lessons/updateDetailLessonsHandler');

server.get('/', getAllLessonsHandler);
server.get('/:id', getDetailLessonHandler);
server.get('/deleted', getDeletedLessons);
server.post("/create", createNewLesson);
server.delete("/delete/:id", deleteMyLesson);
server.put('/restore/:id', restoreDeletedLesson);
server.put('/update/:id', updateLessons);
server.put('/updateDetail/:id', updateLessonsDetails);
server.get('/:name', getDetailLessonHandler);


module.exports = server;

