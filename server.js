const express = require('express');
const logger = require('./middleware/logger')
const userRouter = require('./users/userRouter')
const server = express();


server.use(express.json())
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/users', userRouter)


//custom middleware


module.exports = server;
