const { User } = require("../../db");

const getMonitor = async () => {
  let monitor = await User.findAll({
    where: { isMonitor: true, deletedAt: null },
  });
  if (!monitor) {
    throw new Error("Monitor not found");
  }
  return monitor;
};
module.exports = getMonitor;
