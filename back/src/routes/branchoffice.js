const { Router } = require("express");
const server = Router();
const createNewBranchoffice = require("../Handlers/Branchoffice/createBranchofficeHandler");
const getAllBranchoffice = require("../Handlers/Branchoffice/getBranchofficeHandler")

server.post("/create", createNewBranchoffice);
server.get("/", getAllBranchoffice);
