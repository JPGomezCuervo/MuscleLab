const createBranchOffice = require("../../Controllers/BranchOffice/createBranchOffice")

const createNewBranchOffice = async (req, res) => {
  const { id, name, location, scheduleDays, scheduleHours } = req.body;
  try {
    const newBranchOffice = await createBranchOffice(
      id,
      name,
      location,
      scheduleDays,
      scheduleHours
    );
    res.status(201).json({
      message: "sucursal creada correctamente",
<<<<<<< HEAD
      branchOffice: newBranchOffice,
=======
      branchoffice: newBranchoffice,
>>>>>>> parent of 8837a9b (log create lesson)
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = createNewBranchOffice;
