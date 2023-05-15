require('dotenv').config();
require('./database/index');
const express = require('express');
const router = require('./router');
const passport = require('passport');
require('./services/auth/strategies/jwt');
require('./services/auth/strategies/local');
const cookieParser = require('cookie-parser');

const app = require('express')();
const PORT = process.env.PORT;

app.use(express.json());

app.use(passport.initialize());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`\ninside ${req.method}: ${req.url}`);
  next();
});

app.use('/api', router);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
