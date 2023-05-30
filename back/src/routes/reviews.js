const { Router } = require('express');
const server = Router();
const createReviewHandler = require('../Handlers/Reviews/createReviewsHandler')


server.post('/create', createReviewHandler);

module.exports = server;