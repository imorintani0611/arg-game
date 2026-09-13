// ===== 進度保存 =====
function markUnlocked(key) {
  localStorage.setItem(key, "true");
}
function isUnlocked(key) {
  return localStorage.getItem(key) === "true";
}

function normalize(input) {
  return input.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

// ===== 案件查詢資料庫 =====
// TA06112019：官方對外版本，可完整存取
// SA03112019：可疑死亡紀錄，權限不足，但標題會洩漏是「登錄修正」自另一筆紀錄而來
// MP02112019：失蹤人口通報，權限不足，標題直接洩漏當事人身分
// DR14082020：林秉澤死亡登記，部分可存取
const CASE_DB = {
  "TA06112019": {
    access: true,
    title: "道路交通事故案 · 對外證據整理",
    items: [
      { name: "現場勘查初報", link: "scene-report.html" },
      { name: "目擊者陳述（一）", link: "witness-statement.html" },
      { name: "完整驗屍報告", link: "autopsy-full.html" },
      { name: "結案報告", link: "summary.html" }
    ]
  },
  "SA03112019": {
    access: false,
    title: "登錄修正 MP02112019"
  },
  "MP02112019": {
    access: false,
    title: "失蹤人口通報 — 林曉雨（女，7歲）"
  },
  "DR14082020": {
    access: true,
    title: "死亡登記 · 林秉澤",
    items: [
      { name: "死亡登記基本資料", link: "dr-basic-info.html" },
      { name: "相驗紀錄", locked: true }
    ]
  },
  "CR16082020": {
    access: true,
    title: "永豐機械工廠聚眾事件 · 案件紀錄",
    items: [
      { name: "員警到場處置紀錄", link: "factory-scene-report.html" },
      { name: "員工陳述（節錄）", link: "factory-witness.html" },
      { name: "簽結意見", locked: true, note: "核准人：沈國樑（警政署署長） · 上級指示儘速結案" }
    ]
  }
};

function renderResult(container, code) {
  const record = CASE_DB[code];

  if (!record) {
    container.innerHTML = `
      <div class="result-panel result-notfound">
        <p class="result-status">查無此案件代號</p>
        <p class="result-sub">請確認輸入是否正確。</p>
      </div>`;
    return;
  }

  if (!record.access) {
    container.innerHTML = `
      <div class="result-panel result-denied">
        <p class="result-code">${code}</p>
        <p class="result-title">${record.title}</p>
        <p class="result-status">權限不足</p>
        <p class="result-sub">你目前的權限無法檢視此筆紀錄的完整內容。</p>
      </div>`;
    return;
  }

  const itemsHtml = record.items.map(item => {
    if (item.locked) {
      return `
        <li class="attachment redacted">
          <span class="att-icon">🔒</span>
          <span class="att-name">${item.name}</span>
          <span class="att-tag">權限不足</span>
          ${item.note ? `<span class="att-note">${item.note}</span>` : ""}
        </li>`;
    }
    return `
      <li class="attachment ok">
        <a href="${item.link}" class="attachment-link">
          <span class="att-icon">📄</span>
          <span class="att-name">${item.name}</span>
          <span class="att-tag">可讀取</span>
        </a>
      </li>`;
  }).join("");

  container.innerHTML = `
    <div class="result-panel result-ok">
      <p class="result-code">${code}</p>
      <p class="result-title">${record.title}</p>
      <ul class="attachment-list">
        ${itemsHtml}
      </ul>
    </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  if (!searchBtn) return;

  const input = document.getElementById("caseSearch");
  const result = document.getElementById("searchResult");

  searchBtn.addEventListener("click", () => {
    const code = normalize(input.value);
    if (!code) return;
    renderResult(result, code);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchBtn.click();
  });
});
