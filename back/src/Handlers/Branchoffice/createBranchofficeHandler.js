const createBranchoffice = require("../../Controllers/Branchoffice/createBranchoffice");

const createNewBranchoffice = async (req, res) => {
  const { id, name, location, scheduleDays, scheduleHours } = req.body;
  try {
    const newBranchoffice = await createBranchoffice(
      id,
      name,
      location,
      scheduleDays,
      scheduleHours
    );
    res.status(201).json({
      message: "sucursal creada correctamente",
      branchOffice: newBranchoffice,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = createNewBranchoffice;
