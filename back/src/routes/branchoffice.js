const { Router } = require("express");
const server = Router();
const createNewBranchoffice = require("../Handlers/Branchoffice/createBranchofficeHandler");
const getAllBranchoffice = require("../Handlers/Branchoffice/getBranchofficeHandler");
const getBranchofficeDetail = require("../Handlers/Branchoffice/getBranchofficeDetailHandler");

server.post("/create", createNewBranchoffice);
server.get("/", getAllBranchoffice);
server.get("/:id", getBranchofficeDetail);
