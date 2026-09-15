// ===== 警政署機密通訊系統 =====
// 登入：識別證號用沈國樑的警員編號3302 + 密碼「18062014」（他用車禍那天的日期當密碼，當作自己的污點）
// 這是沈國樑自己的帳號，不是旺卡的——他看到的東西只是「被交辦的任務」片段，不是組織全貌。

const NPA_ID = "3302";
const NPA_PW = "18062014";

// ===== 與旺卡的聊天記錄 =====
// 暫時骨架：先放最近三個案件對應的指示，時間點壓縮在14個月內（2022/12～2024/02），
// 之後會整個重寫成更密集、更頻繁的完整對話。
const WONKA_CHAT = [
  { from: "wonka", date: "2022/12/15", text: ["這隻老鼠處理得太乾淨了，反而有人開始問。", "以後這種事先跟我說一聲再動手。"] },
  { from: "shen",  date: "2022/12/15", text: ["知道了。"] },
  { from: "wonka", date: "2024/01/24", text: ["這筆麵粉記得走現金，不要留單。"] },
  { from: "shen",  date: "2024/01/24", text: ["好。"] },
  { from: "wonka", date: "2024/02/12", text: ["那邊烤箱這個月排滿了，客人都很滿意。", "舊鍋子的東西這週會搬完，麻煩幫忙看一下附近有沒有人在問。"] },
  { from: "shen",  date: "2024/02/12", text: ["我會注意。"] }
];

// ===== 機密檔案留存：最近三個案件 =====
// 案件代碼在一般案件搜尋系統查不到（已從正式紀錄中刪除），這裡是唯一留存的痕跡。
const NPA_CASES = [
  {
    code: "CR22012024",
    title: "張以承 傷害案",
    summary: "市議員之子酒吧鬥毆，打傷酒保致重傷。原始受理為「重傷害」，隔日改列「調解成立、告訴人撤回告訴」結案。",
    attachmentLabel: "交易紀錄片段",
    attachment: [
      "收款方：〇〇育樂有限公司",
      "款項說明：場地公關費"
    ]
  },
  {
    code: "MP09022024",
    title: "信義區「橙室SPA」",
    summary: "登記負責人為人頭，實際用途疑為新安置地點。鄰居曾多次陳情深夜疑似聽聞女童哭聲，受理三日後結案，理由「查無異常」。",
    attachmentLabel: "陳情案附件",
    attachment: [
      "受理單位：〇〇分局",
      "陳情內容：深夜疑似聽聞女童哭聲，多次陳情",
      "處理結果：現場查訪，查無異常，結案"
    ]
  },
  {
    code: "TA30112022",
    title: "黃啟明 車禍身亡案",
    summary: "分局警員，疑似發現轄區內異常失蹤案模式，私下向上呈報，一個月後車禍身亡，結案為單純自撞。",
    attachmentLabel: "簽結備注",
    attachment: [
      "死因：胸腔重創",
      "肇事研判：自撞路樹，無他車介入痕跡"
    ]
  }
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
        window.location.href = "npa-home.html";
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

  // ===== 首頁（私訊分頁 + 檔案分頁） =====
  const contactList = document.getElementById("npaContactList");
  if (contactList) {
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

    // 聯絡人清單：目前只有旺卡，其餘之後再加
    const lastMsg = WONKA_CHAT[WONKA_CHAT.length - 1];
    contactList.innerHTML = `
      <a href="npa-chat-wonka.html" class="npa-contact wonka">
        <div class="npa-contact-avatar">?</div>
        <div class="npa-contact-body">
          <div class="npa-contact-name">旺卡</div>
          <div class="npa-contact-preview">${lastMsg.text[0]}</div>
        </div>
      </a>
      <p class="npa-contact-note">僅顯示近期有往來紀錄的聯絡人。</p>
    `;

    // 檔案清單
    const caseList = document.getElementById("npaCaseList");
    caseList.innerHTML = NPA_CASES.map(c => `
      <div class="npa-case-card">
        <p class="npa-case-title">${c.title}</p>
        <span class="npa-case-deleted-code">案件代碼 ${c.code}（查無此代號）</span>
        <p class="npa-case-summary">${c.summary}</p>
        <p class="npa-case-attachment-label">${c.attachmentLabel}</p>
        <div class="npa-case-attachment">
          ${c.attachment.map(line => `${line}<br>`).join("")}
        </div>
      </div>
    `).join("");

    // 分頁切換
    const tabMsgBtn = document.getElementById("npaTabMsgBtn");
    const tabFileBtn = document.getElementById("npaTabFileBtn");
    const tabMsg = document.getElementById("npaTabMsg");
    const tabFile = document.getElementById("npaTabFile");

    tabMsgBtn.addEventListener("click", () => {
      tabMsgBtn.classList.add("active");
      tabFileBtn.classList.remove("active");
      tabMsg.classList.add("active");
      tabFile.classList.remove("active");
    });
    tabFileBtn.addEventListener("click", () => {
      tabFileBtn.classList.add("active");
      tabMsgBtn.classList.remove("active");
      tabFile.classList.add("active");
      tabMsg.classList.remove("active");
    });

    localStorage.setItem("viewed_npa_inbox", "true");
    return;
  }

  // ===== 旺卡聊天頁 =====
  const thread = document.getElementById("npaChatThread");
  if (thread) {
    if (localStorage.getItem("npa_logged_in") !== "true") {
      window.location.href = "npa-login.html";
      return;
    }

    let lastDate = "";
    thread.innerHTML = WONKA_CHAT.map(m => {
      let dateHtml = "";
      if (m.date !== lastDate) {
        dateHtml = `<div class="npa-chat-date">${m.date}</div>`;
        lastDate = m.date;
      }
      const bubbles = m.text.map(t => `
        <div class="npa-chat-row ${m.from}">
          <div class="npa-chat-bubble">${t}</div>
        </div>
      `).join("");
      return dateHtml + bubbles;
    }).join("");

    window.scrollTo(0, document.body.scrollHeight);
  }
});
