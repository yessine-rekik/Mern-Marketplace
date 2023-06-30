require('dotenv').config();
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = {
  node_env: process.env.NODE_ENV || 'dev',

  port: process.env.PORT || 5000,
  db: process.env.DB || 'mongodb://localhost/marketplace',

  jwt_access_secret: process.env.JWT_ACCESS_SECRET || 'AA',
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || 'BB',

  origin: process.env.ORIGIN || 'http://localhost:3000',
  cloudinary,
};
