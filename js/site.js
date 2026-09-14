// ===== 信件已讀狀態管理 =====
const BASE_MAIL_IDS = ["mail1", "mail2", "mail3", "mail4", "mail5", "mail6"];

function getUnlockedMailIds() {
  const ids = [...BASE_MAIL_IDS];
  if (localStorage.getItem("reply_sent") === "true") {
    ids.push("mail7");
  }
  if (localStorage.getItem("ca_reply_choice") === "purpose") {
    ids.push("mail8");
  }
  if (localStorage.getItem("ca_identity_revealed") === "true") {
    ids.push("mail9");
  }
  if (liuMailUnlocked()) {
    ids.push("mail10");
  }
  const liuOutcome = localStorage.getItem("liu_reply_outcome");
  if (liuOutcome === "1B") {
    ids.push("mail11");
  }
  if (liuOutcome === "2A") {
    ids.push("mail12");
  }
  if (liuOutcome === "2B") {
    ids.push("mail13");
  }
  return ids;
}

function isMailRead(id) {
  return localStorage.getItem("read_" + id) === "true";
}

function markMailRead(id) {
  localStorage.setItem("read_" + id, "true");
}

// 劉育豪的勸告信（mail10）需要玩家湊齊五項線索才會出現：
// 兩份坦白信附件、FC/CR/TR三個案件代碼
function liuMailUnlocked() {
  const requiredFlags = [
    "viewed_liu_history",
    "viewed_notebook",
    "viewed_fc",
    "viewed_cr",
    "viewed_tr_luo"
  ];
  return requiredFlags.every(flag => localStorage.getItem(flag) === "true");
}

function getManagerMailIds() {
  const ids = ["mmail1", "mmail2"];
  if (isMailRead("mmail2")) {
    ids.push("mmail3");
  }
  return ids;
}

function getUnreadCount() {
  const currentAccount = localStorage.getItem("current_account") || "9021";
  if (currentAccount === "7734") {
    return getManagerMailIds().filter(id => !isMailRead(id)).length;
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

  // mail8要等玩家選過問題之後才會出現
  const mail8Item = document.getElementById("mail8Item");
  if (mail8Item) {
    mail8Item.style.display = localStorage.getItem("ca_reply_choice") === "purpose" ? "" : "none";
  }

  // mail9要等玩家猜對李承翰的名字之後才會出現
  const mail9Item = document.getElementById("mail9Item");
  if (mail9Item) {
    mail9Item.style.display = localStorage.getItem("ca_identity_revealed") === "true" ? "" : "none";
  }

  // mail10（劉育豪的勸告信）要等玩家看過他的人事異動歷程才會出現
  const mail10Item = document.getElementById("mail10Item");
  if (mail10Item) {
    mail10Item.style.display = liuMailUnlocked() ? "" : "none";
  }

  // mail11/12/13：依照劉育豪回信的分支結果決定要顯示哪一封
  const liuOutcome = localStorage.getItem("liu_reply_outcome");
  const mail11Item = document.getElementById("mail11Item");
  if (mail11Item) mail11Item.style.display = liuOutcome === "1B" ? "" : "none";
  const mail12Item = document.getElementById("mail12Item");
  if (mail12Item) mail12Item.style.display = liuOutcome === "2A" ? "" : "none";
  const mail13Item = document.getElementById("mail13Item");
  if (mail13Item) mail13Item.style.display = liuOutcome === "2B" ? "" : "none";

  // mmail3（第二封威脅信）要等mmail2被讀過才會出現
  const mmail3Item = document.getElementById("mmail3Item");
  if (mmail3Item) {
    mmail3Item.style.display = isMailRead("mmail2") ? "" : "none";
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
  const managerArchive = document.getElementById("managerArchive");
  if (rookieInbox && managerInbox) {
    rookieInbox.style.display = isManagerIdentity ? "none" : "";
    managerInbox.style.display = isManagerIdentity ? "" : "none";
  }
  if (managerArchive) {
    managerArchive.style.display = isManagerIdentity ? "" : "none";
  }

  updateMailBadges();
});
