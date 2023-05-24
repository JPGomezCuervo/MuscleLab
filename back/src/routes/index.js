const { Router } = require("express");
const lessons = require("./lessons");
const users = require("./users");
const memberships = require("./memberships");
const types = require("./types");
const branchoffice = require("./branchoffice");
const goals = require('./goals');
const test = require('./test');
const router = Router();

router.use("/lessons", lessons);
router.use("/types", types);
router.use("/users", users);
router.use("/goals", goals);
router.use("/memberships", memberships);
router.use("/branchoffice", branchoffice);
router.use('/test', test)

module.exports = router;
