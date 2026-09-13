// ===== 警用人員資料庫 =====
// 姓名+警員編號都要對才查得到，缺一不可
const PERSONNEL_DB = {
  "李承翰": {
    code: "6215",
    fields: {
      "單位": "（資料異動中）",
      "職級": "（資料異動中）",
      "到職日期": "（資料異動中）",
      "離職日期": "2020年9月02日",
      "離職原因": "（資料異動中）",
      "照片": "檔案遺失"
    }
  },
  "劉育豪": {
    code: "7734",
    photo: "images/liu_yuhao.jpg",
    fields: {
      "單位": "臺北市政府警察局中山分局",
      "職級": "分局長",
      "到職日期": "2007年3月",
      "離職日期": "－",
      "離職原因": "－",
      "電子郵件": "yuhao.liu@tcpd.gov.tw",
      "聯絡電話": "(02) 2555-6789 分機 210"
    }
  }
};

function personnelNormalize(input) {
  return input.trim().replace(/\s+/g, "");
}

function personnelNormalizeCode(input) {
  return input.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("personnelBtn");
  if (!btn) return;

  const nameInput = document.getElementById("personnelName");
  const codeInput = document.getElementById("personnelCode");
  const result = document.getElementById("personnelResult");

  btn.addEventListener("click", () => {
    const name = personnelNormalize(nameInput.value);
    const code = personnelNormalizeCode(codeInput.value);

    if (!name || !code) {
      result.innerHTML = `
        <div class="result-panel result-notfound">
          <p class="result-status">查無此人員</p>
          <p class="result-sub">請同時輸入姓名與警員編號。</p>
        </div>`;
      return;
    }

    const record = PERSONNEL_DB[name];

    if (!record || record.code !== code) {
      result.innerHTML = `
        <div class="result-panel result-notfound">
          <p class="result-status">查無此人員</p>
          <p class="result-sub">請確認姓名與警員編號是否正確。</p>
        </div>`;
      return;
    }

    const fieldsHtml = Object.entries(record.fields).map(([label, value]) => `
      <tr><td>${label}</td><td>${value}</td></tr>
    `).join("");

    const photoHtml = record.photo
      ? `<img src="${record.photo}" alt="${name} 證件照" class="personnel-photo">`
      : "";

    result.innerHTML = `
      <div class="result-panel result-ok">
        <p class="result-title">${name}（警員編號 ${code}）</p>
        ${photoHtml}
        <table class="report-table">
          ${fieldsHtml}
        </table>
      </div>`;
  });

  [nameInput, codeInput].forEach(input => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") btn.click();
    });
  });
});
