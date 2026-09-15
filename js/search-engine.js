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
    },
    {
      url: "全國商業登記資料查詢平台",
      title: "商業登記資料異動查詢｜永豐機械工廠",
      date: "2019年3月",
      snippet: "廠房用途變更登記：地下倉儲空間變更為特殊用途，核准日期2019年3月18日……",
      link: "factory-registry.html"
    },
    {
      url: "PPT論壇 › 看板 都市傳說",
      title: "[都市傳說] 工廠的女鬼",
      date: "2020年8月20日",
      snippet: "我是ㄩㄈㄐㄒ工廠的員工，我們工廠有個都市傳說，傳說被捲進機械的女工都會被棄屍在地下室然後埋起來，我原本以為是假的……",
      link: "ppt-forum.html"
    }
  ],
  "劉育豪": [
    {
      url: "臺北市政府警察局 › 表揚公告",
      title: "112年度模範警察表揚公告",
      date: "112年度",
      snippet: "劉育豪，現職臺北市政府警察局中山分局分局長，服務警界多年，工作表現優異，深獲同仁及地方肯定……",
      link: "commendation-liu.html"
    },
    {
      url: "地方新聞網 › 社會版",
      title: "分局長獨生女失蹤 警方籲請民眾協尋",
      date: "最近",
      snippet: "臺北市中山分局分局長劉育豪之女，於住家附近失蹤，警方已擴大搜索，呼籲知情民眾提供線索……",
      link: "news-liu-daughter.html",
      requiresDaughterNews: true
    }
  ],
  "林曉雨": [
    {
      url: "地方新聞網 › 社會版",
      title: "本地學童不幸身亡 警方籲請留意校園周邊交通安全",
      date: "2019年11月07日",
      snippet: "中山區昨日發生一起交通意外，一名7歲女童遭自用小客車擦撞，送醫後仍宣告不治，負責處理此案的劉育豪員警受訪時表示……",
      link: "news-accident-2019.html"
    }
  ],
  "沈國樑": [
    {
      url: "Penguin › 搜尋結果",
      title: "沈國樑 - Penguin 搜尋結果",
      date: "2年前",
      snippet: "新任警政署長沈國樑今日正式就職，致詞以「任重道遠」為題，強調將持續推動基層警力改革與治安維護……",
      link: "penguin-shen.html"
    },
    {
      url: "知識家 › 育兒 › 命名",
      title: "如果把小孩取名叫國樑怎麼樣？",
      date: "9年前",
      snippet: "老婆下個月要生了，是男生。我爸說要叫「國樑」，說是國家的棟樑，聽起來很有出息。但我總覺得怪怪的……",
      link: "qa-naming.html"
    }
  ],
  "張哲瑋": [
    {
      url: "IY › nelson_chang_",
      title: "nelson_chang_ 的 IY 個人檔案",
      date: "懷念帳號",
      snippet: "📷 隨手拍 · ○大 資工二 · 騎車／咖啡／亂跑 — 此帳號已轉為懷念帳號，由家屬管理……",
      link: "iy-nelson.html"
    },
    {
      url: "微光募款平台 › 公益專案",
      title: "為哲瑋點一盞燈｜微光募款",
      date: "2014年8月發起",
      snippet: "哲瑋是我們的獨子，2014年6月18日凌晨，他騎車回家的路上被一輛車撞倒，那輛車沒有停下來……",
      link: "fundraise-zhang.html"
    },
    {
      url: "地方新聞網 › 社會版",
      title: "中山區深夜車禍 大學生騎士不治 肇事車輛逃逸",
      date: "2014年6月18日",
      snippet: "臺北市中山區今日凌晨發生一起死亡車禍，一名大學生騎乘機車返家途中遭後方車輛撞擊倒地，送醫後宣告不治……",
      link: "news-hitrun-2014.html"
    }
  ]
};

// 搜酒駕、肇事逃逸相關關鍵字，找到2014年那起沒有下文的車禍
const HITRUN_KEYWORDS = ["酒駕", "肇事逃逸", "肇逃", "中山區車禍", "2014 車禍", "2014車禍"];
HITRUN_KEYWORDS.forEach(keyword => {
  SEARCH_DB[keyword] = [
    {
      url: "地方新聞網 › 社會版",
      title: "中山區深夜車禍 大學生騎士不治 肇事車輛逃逸",
      date: "2014年6月18日",
      snippet: "臺北市中山區今日凌晨發生一起死亡車禍，一名大學生騎乘機車返家途中遭後方車輛撞擊倒地，肇事車輛未停留即駛離……",
      link: "news-hitrun-2014.html"
    },
    {
      url: "內政部警政署 › 政令宣導",
      title: "酒駕零容忍 警政署擴大取締專案",
      date: "去年",
      snippet: "警政署署長沈國樑宣布擴大酒駕取締，強調執法無差別、不容任何特權，籲請民眾酒後不開車……",
      link: "#"
    }
  ];
});

// 用日期當關鍵字搜尋，只會撈到一堆無關的雜訊
const DATE_DECOY_KEYWORDS = [
  "2014年6月18日", "20140618", "2014/6/18", "2014.6.18",
  "2014年6月18", "6月18日", "18062014", "2014-6-18", "2014/06/18"
];
DATE_DECOY_KEYWORDS.forEach(keyword => {
  SEARCH_DB[keyword] = [
    {
      url: "地方新聞網 › 財經版",
      title: "大樂透今晚開獎 頭獎上看8億",
      date: "2014年6月18日",
      snippet: "本期大樂透連續槓龜，累積頭獎獎金上看8億元，各地彩券行湧現購買人潮，本期開獎號碼為……",
      link: "decoy-lottery.html"
    },
    {
      url: "臺北市政府 › 市政公告",
      title: "端午連假期間交通疏導措施",
      date: "2014年6月18日",
      snippet: "為因應連假期間車流量增加，本府交通局將於上述期間實施交通疏導措施，請用路人配合現場人員指揮……",
      link: "decoy-notice.html"
    }
  ];
});

// 這些關鍵字都會導向同一個匿名爆料論壇
const HATE_POLICE_KEYWORDS = ["警察", "警察局", "台北市政府警察局", "台北警局", "警局", "員警"];
HATE_POLICE_KEYWORDS.forEach(keyword => {
  SEARCH_DB[keyword] = [
    {
      url: "黑特警察 · 匿名爆料論壇",
      title: "黑特警察 - 匿名爆料論壇",
      date: "封存於2020年9月",
      snippet: "匿名爆料警界大小事，內容未經查證，本站已於2020年9月依主管機關要求停止留言功能……",
      link: "hate-police.html"
    }
  ];
});

function seNormalize(input) {
  return input.trim();
}

function seRenderResult(container, query) {
  const key = seNormalize(query);
  let results = SEARCH_DB[key];

  if (!results || results.length === 0) {
    container.innerHTML = `<p class="se-empty">沒有找到與「${key}」相關的結果。</p>`;
    return;
  }

  // 劉育豪女兒的新聞要等劇情觸發之後才會出現
  results = results.filter(r => !r.requiresDaughterNews || localStorage.getItem("daughter_news_available") === "true");

  if (results.length === 0) {
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

// 搜英文名字也能找到同一個人的IY
["Nelson", "nelson", "nelson_chang_", "NELSON"].forEach(k => {
  SEARCH_DB[k] = SEARCH_DB["張哲瑋"];
});

// 永豐機械工廠的常見簡稱也要能搜到同一組結果，不用打全名
["永豐工廠", "永豐機械", "永豐"].forEach(k => {
  SEARCH_DB[k] = SEARCH_DB["永豐機械工廠"];
});

// 沈國樑的英文名字，搜這個才找得到他的Nosebook帳號（搜「沈國樑」本身找不到）
["Henry", "henry", "HENRY", "Henry Shen"].forEach(k => {
  SEARCH_DB[k] = [
    {
      url: "Nosebook",
      title: "Henry Shen",
      date: "社群媒體 · 個人檔案",
      snippet: "分享生活點滴、家庭與朋友聚會的近況……",
      link: "nosebook.html"
    }
  ];
});

// 「糖果派對」其實只是個手遊廣告，誤導玩家以為跟八卦裡的都市傳說有關
SEARCH_DB["糖果派對"] = [
  {
    url: "應用程式商店 › 遊戲",
    title: "糖果派對 Candy Party - 消除煩惱，甜蜜連連！",
    date: "熱門遊戲 · 4.8星",
    snippet: "全台超過500萬人下載的療癒消除遊戲，每天消除煩惱、甜蜜連連……",
    link: "decoy-candyparty.html"
  }
];

// Nosebook留言裡提到的Jerry，搜這個會找到補習班網站的得獎頁面
["Jerry", "jerry", "JERRY"].forEach(k => {
  SEARCH_DB[k] = [
    {
      url: "短頸鹿綜合短期補習班 › 最新消息",
      title: "本班學生榮獲臺北市中等學校英語演講比賽特優！",
      date: "2024/11/02",
      snippet: "恭喜本班英語演講培訓班學生陳威豪同學（英文名 Jerry），在本屆比賽中一舉奪下特優佳績……",
      link: "giraffe-award-speech.html"
    }
  ];
});

// 從Nosebook封面照片標記名單查到的名字，證實他當年真的是署長
SEARCH_DB["陳文昌"] = [
  {
    url: "中央通訊社 · 政治",
    title: "警政署新舊任署長交接典禮 陳文昌卸任 沈國樑接棒",
    date: "2018年5月14日",
    snippet: "警政署今（14）日上午舉行新舊任署長交接典禮，歷經六年任期的署長陳文昌正式卸任，由原副署長沈國樑接任……",
    link: "news-succession.html"
  }
];
