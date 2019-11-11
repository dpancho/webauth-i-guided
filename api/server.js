const express = require('express');

const apiRouter = require('./api-router.js');
const usersRouter = require('../users/users-router');
const configureMiddleware = require('./configure-middleware')

const server = express();

configureMiddleware(server);

server.use('/api', apiRouter);
apiRouter.use('/users', usersRouter)

apiRouter.get('/', (req, res) => {
    res.json({ api: "It's alive!" })
})

module.exports = server;
