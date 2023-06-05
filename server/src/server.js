require('dotenv').config();
require('./database/index');
const express = require('express');
const router = require('./router');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = require('express')();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`\ninside ${req.method}: ${req.url}`);
  next();
});

app.use('/api', router);

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

require('./services/chat/index')(server);
