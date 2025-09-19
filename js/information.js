document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser")) || null;

  if (!user) {
    alert("Vui lòng đăng nhập để xem thông tin cá nhân.");
    window.location.href = "./login.html";
    return;
  }

  // Hiển thị thông tin cơ bản
  document.getElementById("info-name").textContent = user.name;
  document.getElementById("info-email").textContent = user.email;
  document.getElementById("detail-name").textContent = user.name;
  document.getElementById("detail-email").textContent = user.email;

  const hiddenPassword = "*".repeat(user.password.length);
  document.getElementById("detail-password").textContent = hiddenPassword;

  // ✅ Tạo link avatar từ DiceBear API (dùng tên user)
  const avatarUrl = `https://api.dicebear.com/7.x/${user.avatarStyle}/svg?seed=${encodeURIComponent(user.name)}`;

  // Gắn vào thẻ <img>
  const avatarImg = document.querySelector("main img");
  avatarImg.src = avatarUrl;
  avatarImg.alt = `Avatar của ${user.name}`;
});
