const { Router } = require("express");
const server = Router();
//? HANDLERS
const createNewUser = require("../Handlers/Users/createUserHandler");
const deleteMyUser = require("../Handlers/Users/deleteUserHandler");
const getAllUsers = require("../Handlers/Users/getAllUsersHandler");
const getAllMonitor = require("../Handlers/Users/getAllMonitorHandler");
const loginUser = require("../Handlers/Users/loginUserHandler");
const getUserDetail = require("../Handlers/Users/getUserDetailHandler");

server.get("/", getAllUsers);
server.get("/monitor", getAllMonitor);
server.get("/:id", getUserDetail);
server.post("/create", createNewUser);
server.delete("/delete/:id", deleteMyUser);
server.post("/login", loginUser);
module.exports = server;
