// ===== 信件已讀狀態管理 =====
const MAIL_IDS = ["mail1", "mail2", "mail3", "mail4", "mail5", "mail6", "mail7"];

function isMailRead(id) {
  return localStorage.getItem("read_" + id) === "true";
}

function markMailRead(id) {
  localStorage.setItem("read_" + id, "true");
}

function getUnreadCount() {
  return MAIL_IDS.filter(id => !isMailRead(id)).length;
}

function updateMailBadges() {
  const count = getUnreadCount();
  document.querySelectorAll(".mail-badge").forEach(badge => {
    if (count > 0) {
      badge.textContent = count;
      badge.style.display = "";
    } else {
      badge.style.display = "none";
    }
  });

  const label = document.querySelector("[data-unread-label]");
  if (label) {
    label.textContent = count > 0 ? count + " 封未讀" : "全部已讀";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // 如果目前頁面是某封信的詳情頁，標記為已讀
  const mailId = document.body.dataset.mailId;
  if (mailId) {
    markMailRead(mailId);
  }

  // 信箱列表：移除已讀信件的未讀樣式（紅點、粗體）
  document.querySelectorAll(".mail-item[data-mail-id]").forEach(item => {
    if (isMailRead(item.dataset.mailId)) {
      item.classList.remove("unread");
    }
  });

  updateMailBadges();
});
