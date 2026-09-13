// ===== 登入邏輯 =====
document.addEventListener("DOMContentLoaded", () => {
  const accountInput = document.getElementById("loginAccount");
  const passwordInput = document.getElementById("loginPassword");
  const loginBtn = document.getElementById("loginBtn");
  const msg = document.getElementById("loginMsg");
  const rememberedBtn9021 = document.getElementById("rememberedBtn9021");
  const rememberedBtn7734 = document.getElementById("rememberedBtn7734");
  const forgotLink = document.getElementById("forgotLink");

  // 只有取得過主管權限，登入頁才會多記住劉育豪這個帳號
  if (localStorage.getItem("manager_access") === "true" && rememberedBtn7734) {
    rememberedBtn7734.style.display = "";
  }

  loginBtn.addEventListener("click", () => {
    const account = accountInput.value.trim();
    if (account === "9021" || account === "7734") {
      window.location.href = "index.html";
      return;
    }
    msg.textContent = "帳號或密碼錯誤，請確認後再試一次。";
  });

  [rememberedBtn9021, rememberedBtn7734].forEach(btn => {
    if (!btn) return;
    btn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
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
