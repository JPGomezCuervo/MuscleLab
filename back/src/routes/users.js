const { Router } = require("express");
const server = Router();
//? HANDLERS
const createNewUser = require("../Handlers/Users/createUserHandler");
const deleteMyUser = require("../Handlers/Users/deleteUserHandler");
const getAllUsers = require("../Handlers/Users/getAllUsersHandler");
const loginUser = require("../Handlers/Users/loginUserHandler");
server.get("/:id", async (req, res) => {
  res.status(200);
});
server.get("/", getAllUsers);
server.post("/create", createNewUser);
server.delete("/delete/:id", deleteMyUser);
server.post("/login", loginUser);
module.exports = server;
