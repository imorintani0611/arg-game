// ===== 補充陳情表單（manager-mail6.html）=====
// 正確答案就是旺卡在聊天記錄裡給的地址
const REPORT_ANSWER = "中山北路七段45號";

function reportNormalizeLocation(text) {
  return text.trim().replace(/\s+/g, "");
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("reportSubmitBtn");
  if (btn) {
    const input = document.getElementById("reportLocationInput");
    const result = document.getElementById("reportResult");

    if (localStorage.getItem("manager_report_correct") === "true") {
      input.disabled = true;
      btn.disabled = true;
      result.textContent = "已送出，對方已讀。";
      result.className = "reply-status success";
    }

    btn.addEventListener("click", () => {
      const loc = reportNormalizeLocation(input.value);
      if (loc === REPORT_ANSWER) {
        localStorage.setItem("manager_report_correct", "true");
        input.disabled = true;
        btn.disabled = true;
        result.textContent = "已送出，對方已讀。";
        result.className = "reply-status success";
      } else {
        result.textContent = "已送出，尚無回應。";
        result.className = "reply-status pending";
      }
    });
  }

  // ===== manager-mail7.html：帳號停用彈窗 =====
  const closeBtn = document.getElementById("npaSuspendCloseBtn");
  if (closeBtn) {
    const overlay = document.getElementById("npaSuspendOverlay");
    const yesBtn = document.getElementById("npaSuspendYesBtn");

    closeBtn.addEventListener("click", () => {
      overlay.style.display = "flex";
    });

    yesBtn.addEventListener("click", () => {
      window.location.href = "ending.html";
    });
  }
});
