const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

//const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

const server = express();

// middleware
server.use(logger);
server.use(helmet());
//server.use(morgan('short'));
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


//endpoint
server.use('/api/users', userRouter);

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl}`);
  next();
};

module.exports = server;
