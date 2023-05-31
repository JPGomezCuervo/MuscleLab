const { User, LessonDetail } = require("../../db");

const getUsers = async () => {
  const users = await User.findAll({ where: { deletedAt: null }, include:{
    model:LessonDetail,
    attributes:['name'],
    through:{
      attributes:[]
    }
  } });
  return users;
};

module.exports = getUsers;
