// นำเข้า Pool จากไลบรารี pg เพื่อใช้เชื่อมต่อกับ PostgreSQL แบบ connection pool
const { Pool } = require('pg');

// สร้าง pool สำหรับเชื่อมฐานข้อมูล โดยอ่าน URL จาก environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// ส่งออก pool นี้เพื่อให้ไฟล์อื่นนำไปใช้งาน
module.exports = pool;