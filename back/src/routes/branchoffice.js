const { Router } = require("express");
const server = Router();
const createNewBranchOffice = require("../Handlers/BranchOffice/createBranchOfficeHandler");
const getAllBranchOffice = require("../Handlers/BranchOffice/getBranchOfficeHandler");
const getBranchOfficeDetail = require("../Handlers/BranchOffice/getBranchOfficeDetailHandler");
const deleteMyBranchOffice = require("../Handlers/BranchOffice/deleteBranchOfficeHandler");
const updateMyBranchOffice = require("../Handlers/BranchOffice/updateBranchOfficeHandler");

server.post("/create", createNewBranchOffice);
server.get("/", getAllBranchOffice);
server.get("/:id", getBranchOfficeDetail);
server.delete("/delete/:id", deleteMyBranchOffice);
server.put("/update/:id", updateMyBranchOffice);

module.exports = server;
