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

// const cloudinary = require('./config').cloudinary;

// cloudinary.v2.uploader.upload(
//   'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYWlufGVufDB8fDB8fHww&w=1000&q=80',
//   // { public_id: 'olympic_flag' },
//   function (error, result) {
//     console.log(result);
//   }
// );

// console.log(cloudinary.v2.url('d2g5y4mxumsqjdgh0dtq'));
// ==> http://res.cloudinary.com/di97qlmq9/image/upload/cld-sample-5
