// ===== 登入邏輯 =====
document.addEventListener("DOMContentLoaded", () => {
  const accountInput = document.getElementById("loginAccount");
  const passwordInput = document.getElementById("loginPassword");
  const loginBtn = document.getElementById("loginBtn");
  const msg = document.getElementById("loginMsg");
  const rememberedBtn = document.getElementById("rememberedBtn");
  const forgotLink = document.getElementById("forgotLink");

  loginBtn.addEventListener("click", () => {
    const account = accountInput.value.trim();
    if (account === "9021") {
      window.location.href = "index.html";
      return;
    }
    msg.textContent = "帳號或密碼錯誤，請確認後再試一次。";
  });

  rememberedBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  forgotLink.addEventListener("click", (e) => {
    e.preventDefault();
    const account = accountInput.value.trim();
    if (account) {
      window.location.href = "account-reset.html?code=" + encodeURIComponent(account);
    } else {
      window.location.href = "account-reset.html";
    }
  });
});
