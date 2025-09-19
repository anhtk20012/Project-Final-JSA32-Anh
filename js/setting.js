document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser")) || null;
  if (!user) {
    alert("Vui lòng đăng nhập để chỉnh sửa hồ sơ.");
    window.location.href = "./login.html";
    return;
  }

  // Gán dữ liệu hiện tại vào form
  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("avatar-style").value = user.avatarStyle || "initials";

  // Hàm cập nhật preview avatar
  function updateAvatarPreview() {
    const name = document.getElementById("name").value.trim() || "User";
    const style = document.getElementById("avatar-style").value;
    const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(name)}`;
    document.getElementById("avatar-preview").src = avatarUrl;
  }

  // Cập nhật avatar khi đổi tên hoặc style
  document.getElementById("name").addEventListener("input", updateAvatarPreview);
  document.getElementById("avatar-style").addEventListener("change", updateAvatarPreview);
  updateAvatarPreview();

  // Lưu thay đổi
  document.getElementById("setting-form").addEventListener("submit", e => {
    e.preventDefault();

    const newName = document.getElementById("name").value.trim();
    const newPassword = document.getElementById("password").value.trim();
    const newStyle = document.getElementById("avatar-style").value;

    // Cập nhật loggedInUser
    user.name = newName;
    if (newPassword) user.password = newPassword;
    user.avatarStyle = newStyle;

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // Đồng bộ trong danh sách users
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map(u => u.email === user.email ? user : u);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Cập nhật hồ sơ thành công!");
    window.location.href = "./infomation.html";
  });
});
