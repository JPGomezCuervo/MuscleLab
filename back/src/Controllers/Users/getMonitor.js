const { User } = require("../../db");

const getMonitor = async () => {
  console.log("entramos al controller");
  let monitor = await User.findAll({ where: { isMonitor: true } });
  if (!monitor) {
    throw new Error("Monitor not found");
  }
  return monitor;
};
module.exports = getMonitor;
