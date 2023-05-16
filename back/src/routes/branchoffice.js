const { Router } = require("express");
const server = Router();
const createNewBranchoffice = require("../Handlers/Branchoffice/createBranchofficeHandler");
const getAllBranchoffice = require("../Handlers/Branchoffice/getBranchofficeHandler");
const getBranchofficeDetail = require("../Handlers/Branchoffice/getBranchofficeDetailHandler");
const deleteMyBranchoffice = requiere("../Handlers/Branchoffice/deleteBranchofficeHandler")

server.post("/create", createNewBranchoffice);
server.get("/", getAllBranchoffice);
server.get("/:id", getBranchofficeDetail);
server.delete("/delete/:id", deleteMyBranchoffice);
