const { Router } = require('express');
const lessons = require('./lessons');
const users = require('./users');
const memberships = require('./memberships');

const router=Router();

router.use('/lessons', lessons);
router.use('/users', users);
router.use('/memberships', memberships);

module.exports=router;