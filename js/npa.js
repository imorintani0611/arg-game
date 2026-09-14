// ===== 警政署機密通訊系統 =====
// 登入：識別證號 0281 + 密碼「張哲瑋」（沈國樑用受害者名字當密碼）
// 信箱：沈國樑與「旺卡」的往來，只顯示最近15封

const NPA_ID = "0281";
const NPA_PW = "張哲瑋";

// 由舊到新，顯示時反轉
const NPA_MAILS = [
  { from: "wonka", date: "2014/06/19", text: ["昨晚的事處理好了。", "單據抽掉了，畫面也不會再有人看。", "你欠我一次。"] },
  { from: "shen",  date: "2014/06/20", text: ["謝謝。", "我不知道該怎麼報答。"] },
  { from: "wonka", date: "2014/07/02", text: ["下個月有個烘焙聚會，你來。", "什麼都不用帶，什麼都不用問。"] },
  { from: "shen",  date: "2014/08/15", text: ["那個聚會……", "我不確定我適合。"] },
  { from: "wonka", date: "2014/08/15", text: ["你適合。", "中山區那條路的畫面我還留著一份，要不要我寄給你看看？"] },
  { from: "wonka", date: "2015/03/11", text: ["這批糖果品質不錯。", "下週船上見。"] },
  { from: "shen",  date: "2016/09/04", text: ["上次之後我需要一點時間。"] },
  { from: "wonka", date: "2016/09/04", text: ["你太太最近問了不少問題。", "管好她。"] },
  { from: "shen",  date: "2017/02/20", text: ["我們已經分開了。", "她什麼都不知道。"] },
  { from: "wonka", date: "2017/02/21", text: ["很好。", "你升官的事我打過招呼了，下個月會有消息。"] },
  { from: "wonka", date: "2019/11/03", text: ["永豐那邊的平底鍋需要清一下。", "你那邊有個新人不太聽話。"] },
  { from: "shen",  date: "2019/11/05", text: ["已經換人了。", "新的那個很配合。"] },
  { from: "wonka", date: "2020/08/18", text: ["有人在工廠問東問西。", "他有家人吧？"] },
  { from: "shen",  date: "2020/09/01", text: ["處理了。"] },
  { from: "wonka", date: "最近",       text: ["你部下那邊有隻小老鼠在翻東西，好像管不住。", "糖果不夠了，這次從他那邊拿。"] }
];

function npaFromLabel(from) {
  return from === "wonka" ? "旺卡" : "沈國樑";
}

document.addEventListener("DOMContentLoaded", () => {

  // ===== 登入頁 =====
  const btn = document.getElementById("npaBtn");
  if (btn) {
    const idInput = document.getElementById("npaId");
    const pwInput = document.getElementById("npaPw");
    const err = document.getElementById("npaError");

    const tryLogin = () => {
      const id = idInput.value.trim();
      const pw = pwInput.value.trim();
      if (id === NPA_ID && pw === NPA_PW) {
        localStorage.setItem("npa_logged_in", "true");
        window.location.href = "npa-inbox.html";
      } else {
        err.textContent = "驗證失敗。此次嘗試已被記錄。";
        pwInput.value = "";
      }
    };

    btn.addEventListener("click", tryLogin);
    pwInput.addEventListener("keydown", (e) => { if (e.key === "Enter") tryLogin(); });
    idInput.addEventListener("keydown", (e) => { if (e.key === "Enter") pwInput.focus(); });
    return;
  }

  // ===== 信箱頁 =====
  const list = document.getElementById("npaMailList");
  if (list) {
    if (localStorage.getItem("npa_logged_in") !== "true") {
      window.location.href = "npa-login.html";
      return;
    }

    const logout = document.getElementById("npaLogout");
    if (logout) {
      logout.addEventListener("click", () => {
        localStorage.removeItem("npa_logged_in");
      });
    }

    const mails = [...NPA_MAILS].reverse();
    list.innerHTML = mails.map((m, i) => `
      <div class="npa-mail" data-idx="${i}">
        <div class="npa-mail-head">
          <div class="npa-mail-line1">
            <span class="npa-mail-from ${m.from}">${npaFromLabel(m.from)}</span>
            <span class="npa-mail-date">${m.date}</span>
          </div>
          <div class="npa-mail-preview">${m.text[0]}</div>
        </div>
        <div class="npa-mail-body">
          ${m.text.map(t => `<p>${t}</p>`).join("")}
        </div>
      </div>
    `).join("");

    list.querySelectorAll(".npa-mail-head").forEach(head => {
      head.addEventListener("click", () => {
        head.parentElement.classList.toggle("open");
      });
    });

    localStorage.setItem("viewed_npa_inbox", "true");
  }
});
