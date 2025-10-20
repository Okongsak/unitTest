var express = require('express'); // นำเข้า Express framework ก่อน
var path = require('path'); // โมดูลจัดการ path ของไฟล์ระบบ
var cookieParser = require('cookie-parser'); // อ่านค่าจาก cookie ที่ส่งเข้ามาใน request
var logger = require('morgan'); // โมดูลสำหรับ log request HTTP ที่เข้ามา อย่างพวก GET POST /user
var cors = require('cors'); // โมดูลเปิดใช้งาน CORS
 
// นำเข้า router หลักสำหรับ ตั้งค่าpath
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express(); // สร้าง instance ของแอป Express
// ใช้ CORS ก่อน route ใด ๆ ไม่งั้นถ้ามี request response เจอ Cross origins
//app.use(cors());  // <-- อนุญาตทุก origin
// กำหนดเฉพาะ url + method + อนุญาตให้รับส่ง token cookies
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

app.use(logger('dev')); // log การ request แบบละเอียด
app.use(express.json()); // แปลง JSON เป็น object ได้ใน req.body
app.use(express.urlencoded({ extended: false })); // รองรับข้อมูลจาก form (x-www-form-urlencoded)
app.use(cookieParser()); // อ่าน cookie จาก request header
app.use(express.static(path.join(__dirname, 'public'))); // ให้ Express เสิร์ฟไฟล์ static จากโฟลเดอร์ public

app.use('/', indexRouter); // กำหนด URL "/" ให้ไปที่ indexRouter
app.use('/users', usersRouter); // กำหนด URL "/users" ให้ไปที่ usersRouter

module.exports = app;
