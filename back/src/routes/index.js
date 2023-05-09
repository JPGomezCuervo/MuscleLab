const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const users=require('./users');
const lessons=require('./lessons');

const router = Router();

router.use('/users', users)
router.use('/lessons', lessons)

module.exports = router;