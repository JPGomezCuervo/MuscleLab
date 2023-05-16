const { Branchoffice } = require("../../db");

let createBranchoffice = async (
  id,
  name,
  location,
  scheduleDays,
  scheduleHours
) => {
  const foundedBranchoffice = await Branchoffice.findOne({
    where: { name: name },
  });

  if (foundedBranchoffice) {
    throw new Error("La sucursal con ese Nombre ya esta registrada");
  } else if (!name || !location || !scheduleDays || !scheduleHours) {
    throw new Error("Faltan datos");
  }
  const newBranchoffice = await Branchoffice.create({
    id,
    name,
    location,
    scheduleDays,
    scheduleHours,
  });
  return newBranchoffice;
};
module.exports = createBranchoffice;
