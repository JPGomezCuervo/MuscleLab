const { User } = require("../../db");

let createUser = async (id, fullName, password, email, phone, isMonitor) => {
  const foundedUser = await User.findOne({ where: { fullName: fullName } });
  if (foundedUser) {
    throw new Error("That user already exist");
  } else {
    try {
      const newUser = await User.create({
        id,
        fullName,
        password,
        email,
        phone,
        isMonitor,
      });

      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
module.exports = createUser;
