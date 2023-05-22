const { Router } = require("express");
const server = Router();
const createNewBranchOffice = require("../Handlers/BranchOffice/createBranchofficeHandler");
const getAllBranchOffice = require("../Handlers/BranchOffice/getBranchofficeHandler");
const getBranchOfficeDetail = require("../Handlers/BranchOffice/getBranchofficeDetailHandler");
const deleteMyBranchOffice = require("../Handlers/BranchOffice/deleteBranchofficeHandler");
const updateMyBranchOffice = require("../Handlers/BranchOffice/updateBranchofficeHandler");

server.post("/create", createNewBranchOffice);
server.get("/", getAllBranchOffice);
server.get("/:id", getBranchOfficeDetail);
server.delete("/delete/:id", deleteMyBranchOffice);
server.put("/update/:id", updateMyBranchOffice);

module.exports = server;
