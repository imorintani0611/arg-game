// ===== 帳號重設邏輯 =====
// 正確組合：警員編號7734（劉育豪）+ 安全問題「我最開心的一天」+ 答案為女兒生日 11/06
const RESET_TARGET_CODE = "7734";
const RESET_TARGET_QUESTION = "happiest";
const RESET_TARGET_ANSWER = "1106"; // 只比對數字部分，格式寬鬆比對

function resetNormalizeCode(input) {
  return input.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function resetNormalizeAnswer(input) {
  return input.trim().replace(/[^0-9]/g, "");
}

const QUESTION_LABELS = {
  birthday: "我的生日",
  class: "我小學的班級",
  happiest: "我最開心的一天"
};

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".question-btn");
  if (buttons.length === 0) return;

  const answerBlock = document.getElementById("answerBlock");
  const answerLabel = document.getElementById("resetAnswerLabel");
  const codeInput = document.getElementById("resetCode");
  const answerInput = document.getElementById("resetAnswer");
  const resetBtn = document.getElementById("resetBtn");
  const result = document.getElementById("resetResult");

  let selectedQuestion = null;

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      selectedQuestion = btn.dataset.q;
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      answerLabel.textContent = `答案（${QUESTION_LABELS[selectedQuestion]}）`;
      answerBlock.style.display = "";
      result.innerHTML = "";
    });
  });

  resetBtn.addEventListener("click", () => {
    const code = resetNormalizeCode(codeInput.value);
    const answer = resetNormalizeAnswer(answerInput.value);

    if (!code || !selectedQuestion || !answer) {
      result.innerHTML = `
        <div class="result-panel result-notfound">
          <p class="result-status">驗證失敗</p>
          <p class="result-sub">請完整輸入警員編號、選擇問題並填寫答案。</p>
        </div>`;
      return;
    }

    if (code !== RESET_TARGET_CODE || selectedQuestion !== RESET_TARGET_QUESTION || answer !== RESET_TARGET_ANSWER) {
      result.innerHTML = `
        <div class="result-panel result-notfound">
          <p class="result-status">驗證失敗</p>
          <p class="result-sub">警員編號、安全問題或答案有誤，請再確認。</p>
        </div>`;
      return;
    }

    localStorage.setItem("manager_access", "true");
    result.innerHTML = `
      <div class="result-panel result-ok">
        <p class="result-title">驗證成功</p>
        <p class="result-sub">已取得主管層級存取權限。案件查詢系統中原本權限不足的紀錄，現在可以查看了。</p>
      </div>`;
  });
});
