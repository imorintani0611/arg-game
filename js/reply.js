// ===== 回信機制 =====
function replyNormalizeCode(input) {
  return input.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

document.addEventListener("DOMContentLoaded", () => {
  const replyBlock = document.getElementById("replyBlock");
  if (!replyBlock) return;

  const hasSearched = localStorage.getItem("searched_linbingze") === "true";
  if (hasSearched) {
    replyBlock.style.display = "";
  }

  const input = document.getElementById("replyCode");
  const sendBtn = document.getElementById("replySendBtn");
  const result = document.getElementById("replyResult");

  const alreadyReplied = localStorage.getItem("reply_sent") === "true";
  if (alreadyReplied) {
    input.disabled = true;
    sendBtn.disabled = true;
    result.innerHTML = `<p class="reply-status success">已送出，對方已讀。</p>`;
    return;
  }

  sendBtn.addEventListener("click", () => {
    const code = replyNormalizeCode(input.value);
    if (code === "DR14082020") {
      localStorage.setItem("reply_sent", "true");
      input.disabled = true;
      sendBtn.disabled = true;
      result.innerHTML = `<p class="reply-status success">已送出，對方已讀。</p>`;
    } else {
      result.innerHTML = `<p class="reply-status pending">已送出，尚無回應。</p>`;
    }
  });
});
