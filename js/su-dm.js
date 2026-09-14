// ===== 與蘇女士的私訊 =====
// 階段0：空白，玩家先傳一則訊息（內容不限）
// 階段1：蘇回問「你知道那天他撞的是誰嗎？」，玩家要答對死者名字
// 階段2：蘇寄來長信，給帳號與密碼線索

const SU_VICTIM_NAME = "張哲瑋";

const SU_LONG_REPLY = [
  "……你真的查到了。",
  "我不知道你是誰，也不想知道。但如果你連這個都查得到，那你大概已經知道他是什麼樣的人了。",
  "我跟他離婚八年了。我原本以為他本性並不壞，只是被一件事綁住了。但……我現在也不知道了。",
  "那個人我見過一次。在我們家客廳。他很客氣，笑得很溫和，穿得很好。他走了以後，我先生整整兩天沒有說話。",
  "之後他常常跟那個人出去。有時候是船上，有時候是飛機，從來不說要去哪裡。回來以後總是很久不碰我們的女兒。",
  "有一次半夜我聽到他講電話。講的都是糖果、蛋糕、烘焙、平底鍋這些東西。他不是會下廚的人。我聽了十分鐘就知道那些不是在講甜點。",
  "我沒有證據，我什麼都沒有。我只能做這件事。每年那一天，我捐一筆錢，寫一句對不起。我知道那不算什麼。",
  "如果你真的要往下查，這兩樣東西給你。",
  "他的署級系統識別證號是 0281。",
  "他的密碼從來沒有改過。從2014年開始就是那個孩子的名字。他自己設的。",
  "我不會再回你的訊息了。請不要再來找我。"
];

function dmNow() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2,"0")}:${d.getMinutes().toString().padStart(2,"0")}`;
}

function dmAddBubble(thread, cls, html) {
  const b = document.createElement("div");
  b.className = "dm-bubble " + cls;
  b.innerHTML = html;
  thread.appendChild(b);
  return b;
}

function dmAddTime(thread, label) {
  const t = document.createElement("div");
  t.className = "dm-time";
  t.textContent = label;
  thread.appendChild(t);
}

function dmScrollBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}

document.addEventListener("DOMContentLoaded", () => {
  const thread = document.getElementById("dmThread");
  const input = document.getElementById("dmInput");
  const sendBtn = document.getElementById("dmSend");

  let stage = parseInt(localStorage.getItem("su_dm_stage") || "0", 10);
  const firstMsg = localStorage.getItem("su_dm_first") || "";
  const answerMsg = localStorage.getItem("su_dm_answer") || "";

  // 重建對話紀錄
  function render() {
    thread.innerHTML = "";
    if (stage >= 1) {
      dmAddTime(thread, "今天");
      dmAddBubble(thread, "me", firstMsg);
      dmAddBubble(thread, "them", "<p>你是誰？</p><p>你知道那天他撞的是誰嗎？</p>");
    }
    if (stage >= 2) {
      dmAddBubble(thread, "me", answerMsg);
      SU_LONG_REPLY.forEach(line => dmAddBubble(thread, "them", `<p>${line}</p>`));
      input.disabled = true;
      sendBtn.disabled = true;
      input.placeholder = "對方已關閉私訊";
    }
    dmScrollBottom();
  }

  render();

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;

    if (stage === 0) {
      localStorage.setItem("su_dm_first", text);
      localStorage.setItem("su_dm_stage", "1");
      stage = 1;
      input.value = "";
      dmAddTime(thread, "今天");
      dmAddBubble(thread, "me", text);
      const typing = document.createElement("div");
      typing.className = "dm-typing";
      typing.textContent = "對方正在輸入…";
      thread.appendChild(typing);
      dmScrollBottom();
      setTimeout(() => {
        typing.remove();
        dmAddBubble(thread, "them", "<p>你是誰？</p><p>你知道那天他撞的是誰嗎？</p>");
        dmScrollBottom();
      }, 1400);
      return;
    }

    if (stage === 1) {
      input.value = "";
      dmAddBubble(thread, "me", text);
      dmScrollBottom();
      if (text === SU_VICTIM_NAME) {
        localStorage.setItem("su_dm_answer", text);
        localStorage.setItem("su_dm_stage", "2");
        localStorage.setItem("su_dm_done", "true");
        stage = 2;
        const typing = document.createElement("div");
        typing.className = "dm-typing";
        typing.textContent = "對方正在輸入…";
        thread.appendChild(typing);
        dmScrollBottom();
        let i = 0;
        const step = () => {
          if (i === 0) typing.remove();
          if (i < SU_LONG_REPLY.length) {
            dmAddBubble(thread, "them", `<p>${SU_LONG_REPLY[i]}</p>`);
            dmScrollBottom();
            i++;
            setTimeout(step, 900);
          } else {
            input.disabled = true;
            sendBtn.disabled = true;
            input.placeholder = "對方已關閉私訊";
          }
        };
        setTimeout(step, 1800);
      } else {
        // 答錯：已讀不回
        const t = document.createElement("div");
        t.className = "dm-time";
        t.textContent = "已讀";
        thread.appendChild(t);
        dmScrollBottom();
      }
      return;
    }
  }

  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });
});
