const { User } = require("../../db.js");
const bcryptjs = require("bcryptjs");

const updateUser = async (
  id,
  fullName,
  password,
  email,
  phone,
  isMonitor,
  isAdmin
) => {
  try {
    const foundedUser = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!foundedUser) {
      throw new Error("El usuario que deseas modificar no existe");
    } else {
      if (password) {
        const passwordHash = await bcryptjs.hash(password, 8);
        foundedUser.password = passwordHash;
        password
          ? (foundedUser.fullNmame = passwordHash)
          : foundedUser.password;
      }
      fullName ? (foundedUser.fullName = fullName) : foundedUser.fullName;
      email ? (foundedUser.email = email) : foundedUser.email;
      phone ? (foundedUser.phone = phone) : foundedUser.phone;
      isMonitor ? (foundedUser.isMonitor = isMonitor) : foundedUser.isMonitor;
      isAdmin ? (foundedUser.isAdmin = isAdmin) : foundedUser.isAdmin;

      await foundedUser.save();
      return "Usuario actualizado correctamente";
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = updateUser;
