const { Router } = require("express");
const server = Router();

//? HANDLERS
const createNewUser = require("../Handlers/Users/createUserHandler");
const deleteMyUser = require("../Handlers/Users/deleteUserHandler");
const getAllUsers = require("../Handlers/Users/getAllUsersHandler");
const getAllMonitor = require("../Handlers/Users/getAllMonitorHandler");
const loginUser = require("../Handlers/Users/loginUserHandler");
const getUserDetail = require("../Handlers/Users/getUserDetailHandler");
const getDeletedUsers = require("../Handlers/Users/getDeletedUsersHandler");
const restoreDeletedUser = require("../Handlers/Users/restoreDeletedUserHandler");
const updateUsers = require("../Handlers/Users/udpateUserHandler");
const associateLessonHandler= require('../Handlers/Users/associateLessonHandler');
const removeLessonHandler= require('../Handlers/Users/removeLessonHandler');

server.get("/", getAllUsers);
server.get("/monitor", getAllMonitor);
server.get("/deleted", getDeletedUsers);
server.get("/:id", getUserDetail);
server.post("/create", createNewUser);
server.delete("/delete/:id", deleteMyUser);
server.post("/login", loginUser);
server.put("/restore/:id", restoreDeletedUser);
server.put("/update/:id", updateUsers);
server.put("/addLesson/:id", associateLessonHandler);
server.put('/removeLesson/:id', removeLessonHandler);

module.exports = server;
