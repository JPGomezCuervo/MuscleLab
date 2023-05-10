const createUser = require("../../Controllers/Users/createUser");


const createNewUser = async (req, res) => {
  const { id, fullName, password, email, phone, isMonitor } = req.body;
  try {
    const newUser = await createUser(
      id,
      fullName,
      password,
      email,
      phone,
      isMonitor
    );
    res
      .status(201)
      .json({ message: "User created succesfully", user: newUser });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = createNewUser;
