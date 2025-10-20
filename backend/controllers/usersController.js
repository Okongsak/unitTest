const pool = require("../dbConnect"); // ดึง connection pool PostgreSQL
const bcrypt = require("bcrypt");      // ใช้สำหรับ hash และเช็ค password

exports.createUser = async (req, res) => {
  try {
    // รับ request จากหน้าบ้านมา
    const {
      username,
      password,
      email,
      entity_type,
      entity_name,
      tax_id,
      address_number,
      village_no,
      building,
      address_soi,
      address_road,
      subdistrict,
      district,
      province,
      postal_code,
      contact_title,
      contact_first_name,
      contact_last_name,
      phone,
      referral_code,
    } = req.body;

    // เช็ค valid ค่า 3 ตัวพอ
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: "username, password, email are required" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // query หา table column
    const query = `
      INSERT INTO users (
        username, password, email, entity_type, entity_name, tax_id,
        address_number, village_no, building, address_soi, address_road,
        subdistrict, district, province, postal_code,
        contact_title, contact_first_name, contact_last_name,
        phone, referral_code
      )
      VALUES ($1,$2,$3,$4,$5,
              $6,$7,$8,$9,$10,
              $11,$12,$13,$14,
              $15,$16,$17,$18,$19,$20)
      RETURNING id, username, email, entity_type, entity_name;
    `;
    // ^- จับคู่ตามข้อมูลที่รับ request มา ป้องกัน SQL Injection

    // ส่งเป็น array เข้าไป
    const values = [
      username,
      hashedPassword,
      email,
      entity_type,
      entity_name,
      tax_id,
      address_number,
      village_no || null,
      building || null,
      address_soi || null,
      address_road,
      subdistrict,
      district,
      province,
      postal_code,
      contact_title,
      contact_first_name,
      contact_last_name,
      phone,
      referral_code || null,
    ];

    // รันคำสั่ง SQL
    const result = await pool.query(query, values);
    console.log("data=", result);
    res
      .status(201)
      .json({ message: "User created successfully", user: result.rows[0] });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // query user ตาม username
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    const user = result.rows[0]; // ได้ user rows index ตัวแรก

    // เช็ค user
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // เช็กรหัสผ่าน hashed
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // login สำเร็จ ส่ง user กลับไป
    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
