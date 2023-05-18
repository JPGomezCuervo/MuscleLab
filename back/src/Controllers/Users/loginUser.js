const { User } = require("../../db");

const bcryptjs = require("bcryptjs");

const userLogin = async (email, password) => {
  if (!email) {
    throw new Error("Email is undefined");
  }
  let toLogin = await User.findOne({ where: { email: email } });
  if (!toLogin) {
    return { success: false, message: "No se encontró un usuario con ese email" };
  } else {
    const match = await bcryptjs.compare(password, toLogin.password);
    if (match) {
      return { success: true, message: "logeado con exito" };
    } else {
      return { success: false, message: "La contraseña ingresada es incorrecta" };
    }
  }
};
module.exports = userLogin;
