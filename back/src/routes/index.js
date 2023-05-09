const { Router } = require('express');
const lessons = require('./lessons');
const users= require('./users');

const router=Router();

router.use('/lessons', lessons);
router.use('/users', users);

module.exports=router;