const { Router } = require("express");
const lessons = require("./lessons");
const users = require("./users");
const memberships = require("./memberships");
const types = require("./types");
const branchoffice = require("./branchoffice");

const router = Router();

router.use("/lessons", lessons);
router.use("/types", types);
router.use("/users", users);
router.use("/memberships", memberships);
router.use("/branchoffice", branchoffice);
router.get("/", (req, res) => {
  console.log("usuario: ", req.user);
  res.status(200).json({ message: "Ruta 0" });
});
module.exports = router;
