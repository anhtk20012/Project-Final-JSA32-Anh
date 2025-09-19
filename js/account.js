const isEmail = (e) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e || "");

const isStrongPassword = (p) => {
  // >=8, có chữ hoa, chữ thường, số, ký tự đặc biệt
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(p || "");
};

function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value.trim();
    const comfirmPassword = document.getElementById("register-password-cf").value.trim();
    const avatarStyle = 'initials';

    if (!name || !email || !password || !comfirmPassword ) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    if (!name || name.length < 2) {
        alert("Vui lòng nhập họ tên (>= 2 ký tự).");
        return;
    }

    if (!email || !isEmail(email)) {
        alert("Email không hợp lệ.");
        return;
    }

    if (!isStrongPassword(password)) {
        alert("Mật khẩu yếu. Yêu cầu >=8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt.");
        return;
    }

    if (password !== comfirmPassword) {
        alert("Mật khẩu không khớp!");
        return;
    }

    // Lấy danh sách người dùng từ localStorage
    // Nếu chưa có người dùng nào thì khởi tạo mảng rỗng
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // u đại diện cho từng user trong mảng users
    const existedUser = users.find(u => u.email === email);
    if (existedUser) {
        alert("Email đã được đăng ký!");
        return;
    }

    users.push({ name, email, password, avatarStyle});
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công! Chuyển sang trang đăng nhập.");
    window.location.href = "./login.html";
}

function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
        alert("Vui lòng nhập đầy đủ email và mật khẩu.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
        alert(`Chào mừng, ${foundUser.name}! Đăng nhập thành công.`);
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        window.location.href = "../index.html";
    } else {
        alert("Sai email hoặc mật khẩu.");
    }
}

function logoutUser() {
    localStorage.removeItem("loggedInUser");
    alert("Đăng xuất thành công.");
    window.location.href = "./index.html";
}

function checkLoginStatus(event) {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("loggedInUser")) || null;
    if (user) {
        document.getElementById("profile-login")?.classList.add("d-none");
        document.getElementById("profile-register")?.classList.add("d-none");

        document.getElementById("profile-menu")?.classList.remove("d-none");
    }
}