const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

const app = express();

const productRouter = require('./router/product');
const usersRouter = require('./router/users');

const conf = {
  host: 'localhost',
  port: 8888
};

app.use(express.static(path.join(__dirname, 'public')));

// post请求
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


app.use('/users', usersRouter);
app.use('/product',productRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  // 重定向
  res.redirect('/html/404.html');
});

app.listen(conf.port, conf.host, () => {
  console.log(`server is running on http://${conf.host}:${conf.port}`);
});