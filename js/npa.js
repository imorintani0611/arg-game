// ===== 警政署機密通訊系統 =====
// 登入：識別證號用沈國樑的警員編號3302 + 密碼「18062014」（他用車禍那天的日期當密碼，當作自己的污點）
// 這是沈國樑自己的帳號，不是旺卡的——他看到的東西只是「被交辦的任務」片段，不是組織全貌。

const NPA_ID = "3302";
const NPA_PW = "18062014";

// ===== 與旺卡的聊天記錄 =====
// recalled:true 代表「對方已收回訊息」，不顯示內容——暗示還有更多案件或烤箱地點被刻意刪掉
const WONKA_CHAT = [
  { from: "wonka", date: "2019/10/30", text: ["永豐那邊的平底鍋需要清一下。", "你那邊有個新人不太聽話。"] },
  { from: "shen",  date: "2019/11/01", text: ["從現在開始他會聽話的。"] },
  { from: "shen",  date: "2019/11/03", text: ["拿到的不是糖果是老鼠，已處理。"] },
  { from: "wonka", date: "2019/11/03", text: ["多注意一點，平底鍋可以保留嗎？"] },
  { from: "shen",  date: "2019/11/03", text: ["是。我會找看看新的料理人。"] },
  { from: "wonka", date: "2020/03/12", recalled: true },
  { from: "shen",  date: "2020/08/14", text: ["料理人退休了。從我底下找一個應該會比較快。"] },
  { from: "wonka", date: "2020/08/18", text: ["老鼠太囂張了，處理掉。"] },
  { from: "shen",  date: "2020/08/18", text: ["是。"] },
  { from: "shen",  date: "2020/08/20", text: ["已處理。"] },
  { from: "wonka", date: "2020/08/20", text: ["老鼠的頭怎麼沒有斷？"] },
  { from: "shen",  date: "2020/08/20", text: ["警察不太容易處理。我選了比較容易讓他閉嘴的選項。"] },
  { from: "wonka", date: "2020/09/04", text: ["有合適的料理人了嗎？"] },
  { from: "shen",  date: "2020/09/04", text: ["7734"] },
  { from: "wonka", date: "2020/09/04", text: ["好"] },
  { from: "wonka", date: "2021/06/30", recalled: true },
  { from: "wonka", date: "2023/02/14", recalled: true },
  { from: "wonka", date: "2024/01/24", text: ["這筆麵粉記得走現金，不要留單。"] },
  { from: "shen",  date: "2024/01/24", text: ["好。"] },
  { from: "wonka", date: "2024/02/12", text: ["那邊烤箱這個月排滿了，客人都很滿意。", "舊鍋子的東西這週會搬完，麻煩幫忙看一下附近有沒有人在問。"] },
  { from: "shen",  date: "2024/02/12", text: ["我會注意。"] },
  { from: "wonka", date: "2024/06/03", recalled: true },
  { from: "wonka", date: "2024/09/24", text: ["這隻老鼠處理得太乾淨了，反而有人開始問。", "以後這種事先跟我說一聲再動手。"] },
  { from: "shen",  date: "2024/09/24", text: ["知道了。"] },
  { from: "wonka", date: "2024/11/20", recalled: true },
  { from: "wonka", date: "今天", text: ["烤箱在中山北路七段45號，明天同樣時間。"] }
];

// ===== 與劉育豪的聊天記錄 =====
// 他是現任「料理人」，語氣刻意寫得公事公辦、冷靜——跟mail9/mail10裡的掙扎判若兩人
const LIU_CHAT = [
  { from: "shen", date: "2020/09/04", text: ["以後永豐那邊的狀況，你直接跟我報告，不用走正式流程。"] },
  { from: "liu",  date: "2020/09/04", text: ["是，署長。"] },
  { from: "shen", date: "2020/09/10", text: ["平底鍋那邊定期去看一下，有問題馬上跟我說。"] },
  { from: "liu",  date: "2020/09/10", text: ["了解。"] },
  { from: "liu",  date: "2020/11/15", text: ["上個月的貨已經照時間送到了。"] },
  { from: "shen", date: "2020/11/15", text: ["很好，這才是我看重你的原因。"] },
  { from: "shen", date: "2022/06/20", text: ["最近工廠那邊還好嗎？"] },
  { from: "liu",  date: "2022/06/20", text: ["都在控制範圍內。"] },
  { from: "liu",  date: "2023/10/08", text: ["署長，最近……我開始覺得有點不對勁。"] },
  { from: "shen", date: "2023/10/08", text: ["不對勁？你想清楚你現在的位置是怎麼來的。"] },
  { from: "liu",  date: "2023/10/08", text: ["是，我知道了。"] }
];

// ===== 與羅美玉的聊天記錄 =====
// 她是上一任「料理人」，語氣疲憊、認命，知道真相但選擇不再多說
const LUO_CHAT = [
  { from: "shen", date: "2019/10/15", text: ["妳那邊安頓得如何？"] },
  { from: "luo",  date: "2019/10/15", text: ["都上軌道了。"] },
  { from: "shen", date: "2020/01/20", text: ["妳那邊的貨源穩定嗎？"] },
  { from: "luo",  date: "2020/01/20", text: ["穩定。老樣子，不會有問題。"] },
  { from: "luo",  date: "2020/09/06", text: ["劉育豪那孩子，你們選他？"] },
  { from: "shen", date: "2020/09/06", text: ["怎麼，妳不放心？"] },
  { from: "luo",  date: "2020/09/06", text: ["沒事。他會適應的，大家都一樣。"] }
];

// ===== 與陳文昌的聊天記錄 =====
// 全部落在2018/5/14卸任之前，語氣溫暖——他是「已經結束的過去式」
const CHEN_CHAT = [
  { from: "chen", date: "2016/03/02", text: ["最近還好嗎？聽說你們家的事，別太往心裡去。"] },
  { from: "shen", date: "2016/03/02", text: ["謝謝署長關心。"] },
  { from: "chen", date: "2016/03/02", text: ["別叫我署長，私底下叫我一聲大哥就好。"] },
  { from: "chen", date: "2017/08/19", text: ["上面那些人的事，你不用什麼都往心裡去，做好你該做的事就好。"] },
  { from: "shen", date: "2017/08/19", text: ["是。"] }
];

// ===== 聯絡人清單設定 =====
const NPA_CONTACTS = [
  { id: "wonka", name: "旺卡",   avatarText: "?", page: "npa-chat-wonka.html", chat: WONKA_CHAT, subordinate: false, wonkaStyle: true },
  { id: "liu",   name: "劉育豪", avatarText: "劉", page: "npa-chat-liu.html",   chat: LIU_CHAT,   subordinate: true },
  { id: "luo",   name: "羅美玉", avatarText: "羅", page: "npa-chat-luo.html",   chat: LUO_CHAT,   subordinate: true },
  { id: "chen",  name: "陳文昌", avatarText: "陳", page: "npa-chat-chen.html",  chat: CHEN_CHAT,  subordinate: false }
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
    code: "TA10092024",
    title: "黃啟明 車禍身亡案",
    summary: "分局警員，疑似發現轄區內異常失蹤案模式，私下向上呈報，一個月後車禍身亡，結案為單純自撞。",
    attachmentLabel: "簽結備注",
    attachment: [
      "死因：胸腔重創",
      "肇事研判：自撞路樹，無他車介入痕跡"
    ]
  }
];

function npaIsMe(from) {
  return from === "shen";
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

    // 聯絡人清單
    contactList.innerHTML = NPA_CONTACTS.map(c => {
      const lastMsg = c.chat[c.chat.length - 1];
      const lastPreview = lastMsg.recalled ? "對方已收回訊息" : lastMsg.text[0];
      const wonkaClass = c.wonkaStyle ? " wonka" : "";
      return `
        <a href="${c.page}" class="npa-contact${wonkaClass}">
          <div class="npa-contact-avatar">${c.avatarText}</div>
          <div class="npa-contact-body">
            <div class="npa-contact-name">${c.name}</div>
            <div class="npa-contact-preview">${lastPreview}</div>
          </div>
        </a>
      `;
    }).join("") + `<p class="npa-contact-note">僅顯示近期有往來紀錄的聯絡人。</p>`;

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

  // ===== 聊天頁（旺卡／劉育豪／羅美玉／陳文昌 共用） =====
  const thread = document.getElementById("npaChatThread");
  if (thread) {
    if (localStorage.getItem("npa_logged_in") !== "true") {
      window.location.href = "npa-login.html";
      return;
    }

    const contactId = document.body.dataset.contact;
    const contact = NPA_CONTACTS.find(c => c.id === contactId);
    if (!contact) return;

    let lastDate = "";
    thread.innerHTML = contact.chat.map(m => {
      let dateHtml = "";
      if (m.date !== lastDate) {
        dateHtml = `<div class="npa-chat-date">${m.date}</div>`;
        lastDate = m.date;
      }
      const rowClass = npaIsMe(m.from) ? "me" : "them";
      if (m.recalled) {
        return dateHtml + `
          <div class="npa-chat-row ${rowClass}">
            <div class="npa-chat-bubble npa-chat-recalled">對方已收回訊息</div>
          </div>
        `;
      }
      const bubbles = m.text.map(t => `
        <div class="npa-chat-row ${rowClass}">
          <div class="npa-chat-bubble">${t}</div>
        </div>
      `).join("");
      return dateHtml + bubbles;
    }).join("");

    localStorage.setItem("viewed_" + contactId + "_chat", "true");
    window.scrollTo(0, document.body.scrollHeight);
  }
});
