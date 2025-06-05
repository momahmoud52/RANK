let users = [];

document.getElementById("fileInput").addEventListener("change", function (e) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    users = XLSX.utils.sheet_to_json(sheet);
  };
  reader.readAsArrayBuffer(e.target.files[0]);
});

function handleLogin() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const user = users.find(u => u.username === username && String(u.password) === password);

  if (!user) {
    document.getElementById("error").textContent = "اسم المستخدم أو كلمة المرور غير صحيحة.";
    return;
  }

  localStorage.setItem("username", username);
  window.location.href = "dashboard.html";
}
