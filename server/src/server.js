require('dotenv').config();
require('./database/index');
const express = require('express');
const router = require('./router');

const app = require('express')();
const PORT = process.env.PORT;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`\ninside ${req.method}: ${req.url}`);
  next();
});

app.use('/api', router);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
