require('dotenv').config();

module.exports = {
  node_env: process.env.NODE_ENV || 'dev',

  port: process.env.PORT || 5000,
  db: process.env.DB || 'mongodb://localhost/marketplace',

  jwt_access_secret: process.env.JWT_ACCESS_SECRET || 'AA',
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || 'BB',
};
