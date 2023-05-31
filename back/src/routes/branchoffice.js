const { Router } = require("express");
const server = Router();
const createNewBranchOfficeHandler = require("../Handlers/Sucursales/createBranchofficeHandler");
const getAllBranchOffice = require("../Handlers/Sucursales/getBranchofficeHandler.js");
const getBranchOfficeDetail = require("../Handlers/Sucursales/getBranchofficeDetailHandler.js");
const deleteMyBranchOffice = require("../Handlers/Sucursales/deleteBranchofficeHandler.js");
const updateMyBranchOfficeHandler = require("../Handlers/Sucursales/updateBranchofficeHandler.js");

server.post("/create", createNewBranchOfficeHandler.upload, createNewBranchOfficeHandler.createNewBranchOffice);
server.get("/", getAllBranchOffice);
server.get("/:id", getBranchOfficeDetail);
server.delete("/delete/:id", deleteMyBranchOffice);
server.put("/update/:id", updateMyBranchOfficeHandler.upload, updateMyBranchOfficeHandler.updateMyBranchOffice);

module.exports = server;