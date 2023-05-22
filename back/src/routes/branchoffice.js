const { Router } = require("express");
const server = Router();
const Lalo = require("../Handlers/Branchoffice/prueba")
const createNewBranchOffice = require("../Handlers/Branchoffice/createBranchofficeHandler.js");
const getAllBranchOffice = require("../Handlers/Branchoffice/getBranchofficeHandler.js");
const getBranchOfficeDetail = require("../Handlers/Branchoffice/getBranchofficeDetailHandler.js");
const deleteMyBranchOffice = require("../Handlers/Branchoffice/deleteBranchofficeHandler.js");
const updateMyBranchOffice = require("../Handlers/Branchoffice/updateBranchofficeHandler.js");
server.post("/create", createNewBranchOffice);
server.get("/", getAllBranchOffice);
server.get("/:id", getBranchOfficeDetail);
server.delete("/delete/:id", deleteMyBranchOffice);
server.put("/update/:id", updateMyBranchOffice);

module.exports = server;
