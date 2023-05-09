const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const users=require('./users');


const router = Router();

router.use('/users', users)


module.exports = router;