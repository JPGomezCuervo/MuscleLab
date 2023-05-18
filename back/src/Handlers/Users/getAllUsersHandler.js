const getUsers = require("../../Controllers/Users/getUsers");

const getAllUsers = async (req, res) => {
  try {
    let usertoken = req.user;
    console.log(usertoken);
    let user = await getUsers();
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getAllUsers;
