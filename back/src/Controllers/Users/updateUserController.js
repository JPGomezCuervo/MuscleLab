const  { User, Lessons }  = require("../../db.js");

const updateUser = async (id, fullName, password, email, phone, lessons) => {
  const foundedUser = await User.findOne({
    where: {
      id: id,
    },
  });

  if (!foundedUser) {
    throw new Error("El usuario que deseas modificar no existe!");
  }
  if (!fullName || !password || !email || !phone) {
    throw new Error("Todos los campos son obligatorios!");
  };

  await foundedUser.update({
    fullName: fullName,
    password: password,
    email: email,
    phone: phone
  });
  lessons.map(async (lesson) => {
    const l = await Lessons.findOne({
      attributes: ["id"],
      where: { name: lesson }
    });
    foundedUser.addLesson(l?.id);
  });
  return("Usuario actualizado correctamente");
};

module.exports = updateUser;