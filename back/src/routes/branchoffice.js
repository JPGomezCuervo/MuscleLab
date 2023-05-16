const { Router } = require("express");
const server = Router();
const createNewBranchoffice = require("../Handlers/Branchoffice/createBranchofficeHandler");
const getAllBranchoffice = require("../Handlers/Branchoffice/getBranchofficeHandler");
const getBranchofficeDetail = require("../Handlers/Branchoffice/getBranchofficeDetailHandler");
const deleteMyBranchoffice = require(
  "../Handlers/Branchoffice/deleteBranchofficeHandler"
);
const updateMyBranchoffice = require(
  "../Handlers/Branchoffice/updateBranchofficeHandler"
);

server.post("/create", createNewBranchoffice);
server.get("/", getAllBranchoffice);
server.get("/:id", getBranchofficeDetail);
server.delete("/delete/:id", deleteMyBranchoffice);
server.put("/update/:id", updateMyBranchoffice);
