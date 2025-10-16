var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');          // <-- เพิ่มตรงนี้
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// ใช้ CORS ก่อน route ใด ๆ
//app.use(cors());  // <-- อนุญาตทุก origin
// หรือกำหนดเฉพาะ frontend:
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
