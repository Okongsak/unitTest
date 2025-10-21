$(document).ready(function () {
  // Toggle Form
  $("#toRegister").on("click", function () {
    // ซ่อน login form และล้างค่า
    $("#loginForm").removeClass("active").trigger("reset");
    // แสดง register form และล้างค่า
    $("#registerForm").addClass("active").trigger("reset");
  });

  $("#toLogin").on("click", function () {
    // ซ่อน register form และล้างค่า
    $("#registerForm").removeClass("active").trigger("reset");
    // แสดง login form และล้างค่า
    $("#loginForm").addClass("active").trigger("reset");
  });

  $("#togglePassword").on("click", function () {
    const passwordInput = $("#loginPassword");
    const type =
      passwordInput.attr("type") === "password" ? "text" : "password";
    passwordInput.attr("type", type);

    $(this).toggleClass("fa-eye fa-eye-slash");
  });

  // LOGIN FORM
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    const username = $("#loginUsername").val();
    const password = $("#loginPassword").val();

    $.ajax({
      url: "http://127.0.0.1:3000/login",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ username, password }),
      success: function (res) {
        alert("Login successful!");

        const user = res.user;
        console.log("user=", user);

        // เก็บ user ใน localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        // ล้างค่า input
        $("#loginForm")[0].reset();

        // แสดงข้อมูล user
        showUserInfo(user);
      },
      error: function (err) {
        alert("Login failed: " + err.responseJSON?.message);
      },
    });
  });

  // REGISTER FORM
  $("#registerForm").on("submit", function (e) {
    e.preventDefault();

    const password = $("#regPassword").val();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;

    if (!passwordRegex.test(password)) {
      alert(
        "รหัสผ่านต้องมีความยาว 8-20 ตัวอักษร และต้องมีตัวพิมพ์เล็ก ตัวพิมพ์ใหญ่ และตัวเลข อย่างน้อยอย่างละ 1 ตัว"
      );
      return;
    }

    // เกียม DATA ส่งไป ajax
    const data = {
      username: $("#regUsername").val(),
      password: password,
      email: $("#regEmail").val(),
      entity_type: $("#regEntityType").val(),
      entity_name: $("#regEntityName").val(),
      tax_id: $("#regTaxId").val(),
      address_number: $("#regAddressNumber").val(),
      village_no: $("#regVillageNo").val(),
      building: $("#regBuilding").val(),
      address_soi: $("#regSoi").val(),
      address_road: $("#regAddressRoad").val(),
      subdistrict: $("#regSubdistrict").val(),
      district: $("#regDistrict").val(),
      province: $("#regProvince").val(),
      postal_code: $("#regPostalCode").val(),
      contact_title: $("#regContactTitle").val(),
      contact_first_name: $("#regContactFirstName").val(),
      contact_last_name: $("#regContactLastName").val(),
      phone: $("#regPhone").val(),
      referral_code: $("#regReferral").val(),
    };

    $.ajax({
      url: "http://127.0.0.1:3000/users/register",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (res) {
        alert("สมัครเรียบร้อย!");

        // ล้างค่า input
        $("#registerForm")[0].reset();

        // สลับกลับไปหน้า login
        $("#registerForm").removeClass("active");
        $("#loginForm").addClass("active");
      },
      error: function (err) {
        alert("Error: " + err.responseJSON?.error);
      },
    });
  });

  // ฟังก์ชันแสดงข้อมูล user
  function showUserInfo(user) {
    // ซ่อนฟอร์มทั้งหมด
    $("#loginForm, #registerForm").hide();

    // ถ้า div userInfo ยังไม่มี สร้างใหม่
    if ($("#userInfo").length === 0) {
      $("body").append(`<div id="userInfo"></div>`);
    }

    // แสดงข้อมูล user
    $("#userInfo").html(`
      <div class="userProfile-container">
      <h2>ยินดีต้อนรับ ${user.username}</h2>
      <p><b><i class="fas fa-id-card-alt"></i>ชื่อ-สกุล/ชื่อบริษัท:</b> ${
        user.entity_name
      }</p>
      <p><b><i class="fas fa-id-card"></i>เลขบัตรประชาชน/เลขที่ผู้เสียภาษี:</b> ${
        user.tax_id
      }</p>
      <h4><i class="fas fa-map-marked-alt"></i>ที่อยู่</h4>
      <p>
        <b>เลขที่:</b> ${user.address_number || ""},
        <b>หมู่:</b> ${user.village_no || ""},
        <b>หมู่บ่าน/อาคาร:</b> ${user.building || ""},
        <b>ซอย:</b> ${user.address_soi || ""},
        <b>ถนน:</b> ${user.address_road || ""}, 
        <b>ตำบล/แขวง:</b> ${user.subdistrict || ""}, 
        <b>อำเภอ/เขต:</b> ${user.district || ""},
        <b>จังหวัด:</b> ${user.province || ""}, 
        <b>รหัสไปรษณีย์:</b> ${user.postal_code || ""}
      </p>
      <button id="logoutBtn"><i class="fas fa-sign-out-alt"></i>Logout</button>
      </div>
    `);

    // logout
    $("#logoutBtn").on("click", function () {
      localStorage.removeItem("loggedInUser");
      $("#userInfo").remove();
      $("#loginForm").show();
      window.location.reload();
    });
  }

  // ตรวจสอบ localStorage ตอนโหลดหน้า
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    showUserInfo(JSON.parse(loggedInUser));
  }
});
