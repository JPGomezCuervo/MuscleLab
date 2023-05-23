const { BranchOffice } = require("../../db");

let createBranchOffice = async (
  id,
  name,
  location,
  scheduleDays,
  scheduleHourStart,
  scheduleHourFinish
) => {
  const foundedBranchOffice = await BranchOffice.findOne({
    where: { name: name },
  });
  console.log(scheduleDays);
  if (foundedBranchOffice) {
    throw new Error("La sucursal con ese Nombre ya esta registrada");
  } else if (
    !name ||
    !location ||
    !scheduleDays ||
    !scheduleHourStart ||
    !scheduleHourFinish
  ) {
    throw new Error("Faltan datos");
  }
  const newBranchOffice = await BranchOffice.create({
    id,
    name,
    location,
    scheduleDays,
    scheduleHourStart,
    scheduleHourFinish,
  });
  return newBranchOffice;
};
module.exports = createBranchOffice;
