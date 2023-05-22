const { Router } = require("express");
const server = Router();
const Lalo = require("../Handlers/Branchoffice/prueba")
const createNewBranchOffice = require("../Handlers/Prueba/createBranchofficeHandler");
const getAllBranchOffice = require("../Handlers/Prueba/getBranchofficeHandler.js");
const getBranchOfficeDetail = require("../Handlers/Prueba/getBranchofficeDetailHandler.js");
const deleteMyBranchOffice = require("../Handlers/Prueba/deleteBranchofficeHandler.js");
const updateMyBranchOffice = require("../Handlers/Prueba/updateBranchofficeHandler.js");
server.post("/create", createNewBranchOffice);
server.get("/", getAllBranchOffice);
server.get("/:id", getBranchOfficeDetail);
server.delete("/delete/:id", deleteMyBranchOffice);
server.put("/update/:id", updateMyBranchOffice);

module.exports = server;
