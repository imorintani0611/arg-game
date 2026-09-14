// ===== 劉育豪回信機制（2x2分支）=====
// 代碼A：TR10092020（羅美玉的調職代碼）
// 代碼B：TR04092020（劉育豪自己的調職代碼）
// 句子1：我會繼續查下去　句子2：我會退出的
// 1-B 是唯一能繼續查案的分支，其餘三種都會走向劉育豪女兒意外身亡的結局

const LIU_CODE_A = "TR10092020";
const LIU_CODE_B = "TR04092020";

function liuNormalizeCode(input) {
  return input.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function liuLockAll() {
  ["liuCode1", "liuBtn1", "liuCode2", "liuBtn2"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = true;
  });
}

function liuSubmit(sentenceNum, inputId, resultId) {
  const input = document.getElementById(inputId);
  const result = document.getElementById(resultId);
  const code = liuNormalizeCode(input.value);

  if (code !== LIU_CODE_A && code !== LIU_CODE_B) {
    result.textContent = "已送出，尚無回應。";
    result.className = "reply-status pending";
    return;
  }

  const letter = code === LIU_CODE_A ? "A" : "B";
  const outcome = sentenceNum + letter; // "1A" / "1B" / "2A" / "2B"

  localStorage.setItem("liu_reply_outcome", outcome);
  liuLockAll();

  if (outcome === "1A") {
    result.textContent = "已送出，已讀不回。";
    result.className = "reply-status pending";
    localStorage.setItem("daughter_news_available", "true");
  } else {
    result.textContent = "已送出，對方已讀。";
    result.className = "reply-status success";
    if (outcome === "2A" || outcome === "2B") {
      localStorage.setItem("daughter_news_available", "true");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btn1 = document.getElementById("liuBtn1");
  if (!btn1) return;

  // 如果已經選過，畫面回來要恢復鎖定狀態並顯示原本的結果
  const savedOutcome = localStorage.getItem("liu_reply_outcome");
  if (savedOutcome) {
    liuLockAll();
    const sentenceNum = savedOutcome[0];
    const resultId = sentenceNum === "1" ? "liuResult1" : "liuResult2";
    const result = document.getElementById(resultId);
    if (savedOutcome === "1A") {
      result.textContent = "已送出，已讀不回。";
      result.className = "reply-status pending";
    } else {
      result.textContent = "已送出，對方已讀。";
      result.className = "reply-status success";
    }
    return;
  }

  btn1.addEventListener("click", () => liuSubmit("1", "liuCode1", "liuResult1"));
  document.getElementById("liuBtn2").addEventListener("click", () => liuSubmit("2", "liuCode2", "liuResult2"));
});
