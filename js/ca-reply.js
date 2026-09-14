// ===== CA10102019 回信機制 =====
// 前提：玩家要先查過CA20082020這個案件代號，才會在mail7看到回信選項
// 「你是誰」沒有回覆 -> 追加欄位留在mail7原地
// 「你的目的是什麼」有回覆 -> 新信mail8，追加欄位跟著那封信走
// 猜對「李承翰」-> 原地顯示已送出，mail9坦白信自然出現在信箱列表裡讓玩家自己點進去

const CA_TARGET_NAME = "李承翰";

function caNormalizeName(input) {
  return input.trim();
}

// 共用的「猜名字」邏輯，傳入對應的DOM元素id
function setupNameGuess(inputId, btnId, resultId) {
  const input = document.getElementById(inputId);
  const btn = document.getElementById(btnId);
  const result = document.getElementById(resultId);
  if (!btn) return;

  // 如果已經猜對過，直接顯示已讀狀態，不用再猜一次
  if (localStorage.getItem("ca_identity_revealed") === "true") {
    input.disabled = true;
    btn.disabled = true;
    result.textContent = "已送出，對方已讀。";
    result.className = "reply-status success";
    return;
  }

  btn.addEventListener("click", () => {
    const guess = caNormalizeName(input.value);
    if (guess === CA_TARGET_NAME) {
      localStorage.setItem("ca_identity_revealed", "true");
      input.disabled = true;
      btn.disabled = true;
      result.textContent = "已送出，對方已讀。";
      result.className = "reply-status success";
    } else {
      result.textContent = "已送出，尚無回應。";
      result.className = "reply-status pending";
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btn.click();
  });
}

document.addEventListener("DOMContentLoaded", () => {

  // ===== mail7：選擇問題的按鈕 + 「你是誰」的追加欄位 =====
  const replyBlock = document.getElementById("caReplyBlock");
  if (replyBlock) {
    if (localStorage.getItem("viewed_ca") === "true") {
      replyBlock.style.display = "";
    }

    const askWhoBtn = document.getElementById("askWhoBtn");
    const askPurposeBtn = document.getElementById("askPurposeBtn");
    const whoGuessBlock = document.getElementById("whoGuessBlock");

    const savedChoice = localStorage.getItem("ca_reply_choice");
    if (savedChoice) {
      askWhoBtn.disabled = true;
      askPurposeBtn.disabled = true;
      askWhoBtn.classList.toggle("active", savedChoice === "who");
      askPurposeBtn.classList.toggle("active", savedChoice === "purpose");
    }
    // 只有選「你是誰」才會在這一頁出現追加欄位
    if (savedChoice === "who") {
      whoGuessBlock.style.display = "";
    }

    askWhoBtn.addEventListener("click", () => {
      if (localStorage.getItem("ca_reply_choice")) return;
      localStorage.setItem("ca_reply_choice", "who");
      askWhoBtn.disabled = true;
      askPurposeBtn.disabled = true;
      askWhoBtn.classList.add("active");
      whoGuessBlock.style.display = "";
    });

    askPurposeBtn.addEventListener("click", () => {
      if (localStorage.getItem("ca_reply_choice")) return;
      localStorage.setItem("ca_reply_choice", "purpose");
      window.location.href = "mail8.html";
    });

    setupNameGuess("caNameInput", "caNameBtn", "caNameResult");
  }

  // ===== mail8：「你的目的是什麼」的回覆信 + 追加欄位 =====
  const mail8Btn = document.getElementById("caNameBtnMail8");
  if (mail8Btn) {
    setupNameGuess("caNameInputMail8", "caNameBtnMail8", "caNameResultMail8");
  }
});
