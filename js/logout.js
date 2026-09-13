// ===== 登出邏輯（兩段式確認）=====
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("logoutBtn");
  if (!btn) return;

  const msg = document.getElementById("logoutMsg");
  let confirming = false;

  btn.addEventListener("click", () => {
    if (!confirming) {
      confirming = true;
      msg.textContent = "若非特殊情況，請勿擅自登出警用帳號。再按一次「登出系統」以確認。";
      btn.textContent = "確定登出";
      return;
    }
    window.location.href = "login.html";
  });
});
