// ===== 信件已讀狀態管理 =====
const BASE_MAIL_IDS = ["mail1", "mail2", "mail3", "mail4", "mail5", "mail6"];

function getUnlockedMailIds() {
  const ids = [...BASE_MAIL_IDS];
  if (localStorage.getItem("reply_sent") === "true") {
    ids.push("mail7");
  }
  return ids;
}

function isMailRead(id) {
  return localStorage.getItem("read_" + id) === "true";
}

function markMailRead(id) {
  localStorage.setItem("read_" + id, "true");
}

function getUnreadCount() {
  const currentAccount = localStorage.getItem("current_account") || "9021";
  if (currentAccount === "7734") {
    return 0;
  }
  return getUnlockedMailIds().filter(id => !isMailRead(id)).length;
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

  // mail7要等玩家送出第一封回信之後才會出現在信箱列表裡
  const mail7Item = document.getElementById("mail7Item");
  if (mail7Item) {
    mail7Item.style.display = localStorage.getItem("reply_sent") === "true" ? "" : "none";
  }

  // 取得主管權限跟顯示的身分是兩件事：
  // manager_access 是永久解鎖狀態（解過的檔案不會再鎖回去）
  // current_account 才是「目前登入的是哪個身分」，決定畫面上顯示什麼
  const currentAccount = localStorage.getItem("current_account") || "9021";
  const isManagerIdentity = currentAccount === "7734";

  document.querySelectorAll(".access-level").forEach(el => {
    el.textContent = isManagerIdentity ? "主管" : "一般";
  });
  document.querySelectorAll(".logged-in-id").forEach(el => {
    el.textContent = currentAccount;
  });

  // 信箱頁面：主管帳號跟菜鳥帳號看到的信件不一樣
  const rookieInbox = document.getElementById("rookieInbox");
  const managerInbox = document.getElementById("managerInbox");
  if (rookieInbox && managerInbox) {
    rookieInbox.style.display = isManagerIdentity ? "none" : "";
    managerInbox.style.display = isManagerIdentity ? "" : "none";
  }

  updateMailBadges();
});
