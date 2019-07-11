const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const router = require('./router');

const server = express();
const PORT = 5000;

server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

server.use(router);

server.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Please check the URL and try again.',
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
