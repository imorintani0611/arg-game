// ===== 蘇的三題驗證（取代舊版單題劇情）=====
// 前提：liu_reply_outcome === "1B"（已收到mail11） 且 manager_access === "true"（長官層級）
// 沒達成前提，不管玩家傳什麼，蘇完全不會回應——訊息會送出，但永遠已讀不回。
//
// 流程：
//   玩家傳第一則訊息 → 蘇開場白（提到Henry，玩家才知道要去搜Henry找Nosebook）→ 問題①車牌
//   答對①車牌 → 問題②同車的人是誰（陳文昌）
//   答對②姓名 → 問題③他當時的身分（警政署署長）
//   答對③身分 → 蘇一次講完最後六句（每句間隔2秒）→ 封鎖

const SU2_ANSWERS = {
  1: "7380YB",
  2: "陳文昌",
  3: "警政署署長"
};

const SU2_OPENING = [
  "你也是來問Henry的事嗎？",
  "我已經跟很多記者談過了，最後誰也不敢把這些事情寫成報導。",
  "你能找到這裡也是夠執著了，你能夠答對我的問題我就把我知道的都告訴你。"
];

const SU2_QUESTIONS = {
  1: "他那天開的車，車牌號碼是多少？",
  2: "那天晚上，跟他同車的人是誰？",
  3: "你知道他當時是什麼身分嗎？"
};

const SU2_REACTIONS = {
  1: "……你是怎麼找到的？好吧。",
  2: "……你連這個都查到了。"
};

const SU2_WRONG = {
  1: "不是。",
  2: "……你猜的？",
  3: "不對，你什麼都還沒查到。"
};

// 答對第三題後，一次講完，每句間隔2秒，最後封鎖
const SU2_FINAL = [
  "我沒什麼好說的，我曾經以為這個人的根本是善良的，但現在的我也不知道了。",
  "回過頭來無話不談的另一半卻成了只剩下秘密的陌生人。",
  "你一定不懂吧。",
  "他總是用那一天當作他的密碼，說是他的污點。",
  "如果你有需要的話就拿去試試看吧。",
  "不要再找我了。"
];

function su2Unlocked() {
  return localStorage.getItem("liu_reply_outcome") === "1B" &&
         localStorage.getItem("manager_access") === "true";
}

function su2Normalize(text) {
  return text.trim();
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

function dmTyping(thread) {
  const typing = document.createElement("div");
  typing.className = "dm-typing";
  typing.textContent = "對方正在輸入…";
  thread.appendChild(typing);
  dmScrollBottom();
  return typing;
}

// 依序把多行訊息以固定間隔顯示出來，全部顯示完後寫入history並執行callback
function dmSequence(thread, history, lines, interval, callback) {
  let i = 0;
  const typing = dmTyping(thread);
  const step = () => {
    if (i === 0) typing.remove();
    if (i < lines.length) {
      dmAddBubble(thread, "them", `<p>${lines[i]}</p>`);
      dmScrollBottom();
      i++;
      setTimeout(step, interval);
    } else {
      lines.forEach(l => {
        history.push({ who: "them", html: `<p>${l}</p>` });
      });
      localStorage.setItem("su2_history", JSON.stringify(history));
      if (callback) callback();
    }
  };
  setTimeout(step, interval);
}

document.addEventListener("DOMContentLoaded", () => {
  const thread = document.getElementById("dmThread");
  const input = document.getElementById("dmInput");
  const sendBtn = document.getElementById("dmSend");
  if (!thread || !input || !sendBtn) return;

  let stage = parseInt(localStorage.getItem("su2_stage") || "0", 10);
  let history = JSON.parse(localStorage.getItem("su2_history") || "[]");

  function render() {
    thread.innerHTML = "";
    if (history.length > 0) {
      dmAddTime(thread, "今天");
      history.forEach(entry => dmAddBubble(thread, entry.who, entry.html));
    }
    if (stage >= 4) {
      input.disabled = true;
      sendBtn.disabled = true;
      input.placeholder = "已被對方封鎖";
      dmAddTime(thread, "已被對方封鎖");
    }
    dmScrollBottom();
  }

  render();

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;
    input.value = "";

    history.push({ who: "me", html: text });
    localStorage.setItem("su2_history", JSON.stringify(history));
    dmAddBubble(thread, "me", text);
    dmScrollBottom();

    // 前提未達成：訊息照樣送出，但蘇完全不會回應
    if (!su2Unlocked()) return;

    if (stage === 0) {
      stage = 1;
      localStorage.setItem("su2_stage", "1");
      dmSequence(thread, history, [...SU2_OPENING, SU2_QUESTIONS[1]], 2000);
      return;
    }

    if (stage >= 1 && stage <= 3) {
      const qNum = stage;
      if (su2Normalize(text) === SU2_ANSWERS[qNum]) {
        if (qNum < 3) {
          stage = qNum + 1;
          localStorage.setItem("su2_stage", String(stage));
          dmSequence(thread, history, [SU2_REACTIONS[qNum], SU2_QUESTIONS[qNum + 1]], 2000);
        } else {
          stage = 4;
          localStorage.setItem("su2_stage", "4");
          dmSequence(thread, history, SU2_FINAL, 2000, () => {
            input.disabled = true;
            sendBtn.disabled = true;
            input.placeholder = "已被對方封鎖";
            dmAddTime(thread, "已被對方封鎖");
            dmScrollBottom();
          });
        }
      } else {
        const typing = dmTyping(thread);
        setTimeout(() => {
          typing.remove();
          const wrongLine = SU2_WRONG[qNum];
          dmAddBubble(thread, "them", `<p>${wrongLine}</p>`);
          history.push({ who: "them", html: `<p>${wrongLine}</p>` });
          localStorage.setItem("su2_history", JSON.stringify(history));
          dmScrollBottom();
        }, 1200);
      }
    }
  }

  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });
});
