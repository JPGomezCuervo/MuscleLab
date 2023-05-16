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
  } catch (error) {}
};
