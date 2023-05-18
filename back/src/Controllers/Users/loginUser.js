const { User } = require("../../db");

const bcryptjs = require("bcryptjs");

const userLogin = async (email, password) => {
  if (!email) {
    throw new Error("Email is undefined");
  }
  let toLogin = await User.findOne({ where: { email: email } });
  if (!toLogin) {
    throw new Error("Email not found");
  } else {
    const match = await bcryptjs.compare(password, toLogin.password);
    if (match) {
      return { success: true, message: "logeado con exito" };
    } else {
      return { success: false, message: "contraseña incorrecta" };
    }
  }
};
module.exports = userLogin;
