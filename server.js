const express = require('express');
const logger = require('./middleware/logger')
const userRouter = require('./users/userRouter')
const postsRouter = require('./posts/postRouter')
const server = express();


server.use(express.json())
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/users', userRouter)
server.use('/api/posts', postsRouter)

//custom middleware


module.exports = server;
