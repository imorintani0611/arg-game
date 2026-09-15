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
    const password = passwordInput.value.trim();

    // 沈國樑的CMS7帳號已停用，密碼對了也一樣，直接導去署級系統
    if (account === "3302" && password === "18062014") {
      msg.textContent = "您的CMS7系統已停用，請登錄署級系統。";
      return;
    }

    if (account === "9021" || account === "7734") {
      localStorage.setItem("current_account", account);
      window.location.href = "index.html";
      return;
    }
    msg.textContent = "帳號或密碼錯誤，請確認後再試一次。";
  });

  if (rememberedBtn9021) {
    rememberedBtn9021.addEventListener("click", () => {
      localStorage.setItem("current_account", "9021");
      window.location.href = "index.html";
    });
  }
  if (rememberedBtn7734) {
    rememberedBtn7734.addEventListener("click", () => {
      localStorage.setItem("current_account", "7734");
      window.location.href = "index.html";
    });
  }

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
