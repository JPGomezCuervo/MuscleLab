const { BranchOffice } = require("../../db");
let updateBranchOffice = async (
  id,
  name,
  image,
  location,
  scheduleDays,
  scheduleHourStart,
  scheduleHourFinish
) => {
  let toUpdate = await BranchOffice.findOne({ where: { id: id } });
  if (!toUpdate) {
    throw new Error("No se encontró sucursal");
  }
  await toUpdate.update({
    name: name,
    image: image,
    location: location,
    scheduleDays: scheduleDays,
    scheduleHourStart: scheduleHourStart,
    scheduleHourFinish:scheduleHourFinish
  });
  return `Sucursal ${toUpdate.name} fue editada con exito`;

};
module.exports = updateBranchOffice;
