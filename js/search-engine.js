// ===== 識途查詢系統：關鍵字搜尋邏輯 =====
// 之後可以持續往這個資料庫加入新的關鍵字結果
const SEARCH_DB = {
  "林秉澤": [
    {
      url: "財團法人林氏宗親會 › 族譜查詢",
      title: "西河林氏 第十八世族譜節錄",
      date: "族譜資料庫",
      snippet: "……秉宗公三子：秉宏、秉澤、秉德。秉澤公，旅居海外多年，族譜資料久未更新，近況不詳……",
      link: "decoy1.html"
    },
    {
      url: "全國商業登記資料查詢平台",
      title: "商業登記基本資料｜秉澤小吃店",
      date: "營業中",
      snippet: "負責人：林秉澤。登記地址：屏東縣○○鄉○○路37號。核准設立：民國105年……",
      link: "decoy2.html"
    },
    {
      url: "福安殯儀館 › 公開訃聞查詢",
      title: "人名查詢系統 － 林秉澤",
      date: "共4筆資料",
      snippet: "查詢姓名「林秉澤」共找到4筆相符資料，請點選查看詳細治喪資訊……",
      link: "funeral-notice.html"
    },
    {
      url: "釣魚同好會論壇 › 會員發言",
      title: "【釣況分享】新竹外海一日遊戰績",
      date: "3天前",
      snippet: "發文者：阿澤（林秉澤）。這禮拜天氣不錯，跟釣友約去新竹外海，這次戰績還不錯……",
      link: "decoy3.html"
    }
  ],
  "永豐機械工廠": [
    {
      url: "地方新聞網 › 社會版",
      title: "永豐機械工廠員工暴動 工廠拒絕表態",
      date: "2020年8月17日",
      snippet: "林氏經理病逝，工廠員工暴動，一名探視高層主管受傷，警方出動鎮壓，工廠拒絕採訪，警方表示該事故為勞資糾紛……",
      link: "news-factory.html"
    }
  ]
};

function seNormalize(input) {
  return input.trim();
}

function seRenderResult(container, query) {
  const key = seNormalize(query);
  const results = SEARCH_DB[key];

  if (!results || results.length === 0) {
    container.innerHTML = `<p class="se-empty">沒有找到與「${key}」相關的結果。</p>`;
    return;
  }

  container.innerHTML = results.map(r => {
    const titleTag = r.link
      ? `<a href="${r.link}" class="se-result-title">${r.title}</a>`
      : `<a href="#" class="se-result-title" onclick="return false;">${r.title}</a>`;
    return `
    <div class="se-result-item">
      <p class="se-result-url">${r.url}</p>
      ${titleTag}
      <p class="se-result-snippet"><span class="se-result-date">${r.date}</span> — ${r.snippet}</p>
    </div>
  `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("seSearchBtn");
  if (!btn) return;

  const input = document.getElementById("seSearchInput");
  const result = document.getElementById("seResult");

  btn.addEventListener("click", () => {
    const q = input.value;
    if (!q.trim()) return;
    if (seNormalize(q) === "林秉澤") {
      localStorage.setItem("searched_linbingze", "true");
    }
    seRenderResult(result, q);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btn.click();
  });
});
