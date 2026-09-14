// ===== CA10102019 回信機制 =====
// 前提：玩家要先查過CA10102019這個案件代號
// 選一次不能反悔，不管選哪個都要猜對「李承翰」才能看到坦白內容

function caNormalizeName(input) {
  return input.trim();
}

const CA_TARGET_NAME = "李承翰";

const CA_CONFESSION = `
  <p>沒錯，是我。李承翰。</p>
  <p>我曾經是負責這個案子的警察，我不願意造假，所以被換掉了。</p>
  <p>後來我發現，這一切遠比我想像的還要大——不只是一個人，是一群人。</p>
  <p>我的家人也因此付出了代價。</p>
  <p>我不知道還能相信誰，所以我選擇相信你。</p>
  <p>你已經走到這一步了，剩下的，我需要你的幫忙。</p>
`;

function caRenderNameGuess(container) {
  const alreadySolved = localStorage.getItem("ca_identity_revealed") === "true";

  if (alreadySolved) {
    container.innerHTML = `
      <div class="letter" style="margin-top:16px;">
        ${CA_CONFESSION}
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="reply-template" style="margin-top:16px;">
      <span>你是</span>
      <input type="text" id="caNameInput" class="reply-input" autocomplete="off">
      <span>吧？</span>
    </div>
    <button id="caNameBtn" class="btn-primary" style="width:100%">送出</button>
    <p id="caNameResult" class="reply-status"></p>
  `;

  const nameInput = document.getElementById("caNameInput");
  const nameBtn = document.getElementById("caNameBtn");
  const nameResult = document.getElementById("caNameResult");

  nameBtn.addEventListener("click", () => {
    const guess = caNormalizeName(nameInput.value);
    if (guess === CA_TARGET_NAME) {
      localStorage.setItem("ca_identity_revealed", "true");
      caRenderNameGuess(container);
    } else {
      nameResult.textContent = "已送出，尚無回應。";
      nameResult.className = "reply-status pending";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const block = document.getElementById("caReplyBlock");
  if (!block) return;

  if (localStorage.getItem("viewed_ca") === "true") {
    block.style.display = "";
  } else {
    return;
  }

  const askWhoBtn = document.getElementById("askWhoBtn");
  const askPurposeBtn = document.getElementById("askPurposeBtn");
  const thread = document.getElementById("caReplyThread");

  function lockChoice(choice) {
    askWhoBtn.disabled = true;
    askPurposeBtn.disabled = true;
    askWhoBtn.classList.toggle("active", choice === "who");
    askPurposeBtn.classList.toggle("active", choice === "purpose");
  }

  function renderChoice(choice) {
    thread.innerHTML = "";
    if (choice === "purpose") {
      const replyP = document.createElement("div");
      replyP.className = "letter";
      replyP.style.marginTop = "16px";
      replyP.innerHTML = "<p>我只是覺得所有人都值得知道真相。</p>";
      thread.appendChild(replyP);
    }
    const guessBox = document.createElement("div");
    thread.appendChild(guessBox);
    caRenderNameGuess(guessBox);
  }

  const savedChoice = localStorage.getItem("ca_reply_choice");
  if (savedChoice) {
    lockChoice(savedChoice);
    renderChoice(savedChoice);
  }

  askWhoBtn.addEventListener("click", () => {
    if (localStorage.getItem("ca_reply_choice")) return;
    localStorage.setItem("ca_reply_choice", "who");
    lockChoice("who");
    renderChoice("who");
  });

  askPurposeBtn.addEventListener("click", () => {
    if (localStorage.getItem("ca_reply_choice")) return;
    localStorage.setItem("ca_reply_choice", "purpose");
    lockChoice("purpose");
    renderChoice("purpose");
  });
});
