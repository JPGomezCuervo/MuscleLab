const { User } = require("../../db");
const jwt = require("jsonwebtoken");

let createUser = async (
  id,
  fullName,
  password,
  email,
  phone,
  isMonitor,
  isAdmin
) => {
  const foundedUser = await User.findOne({ where: { email: email } });
  if (foundedUser) {
    throw new Error("That email has already been registered ");
  } else {
    try {
      const newUser = await User.create({
        id,
        fullName,
        password,
        email,
        phone,
        isMonitor,
        isAdmin,
      });
      const token = generateToken(newUser.id, newUser.isAdmin);

      return  {newUser, token};
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      nombre: user.nombre,
      isAdmin: user.isAdmin,
    },
    "secretKey"
  );
  return token;
};
module.exports = createUser;
