// ===== Nosebook：貼文排序切換（最相關 / 最近）=====
// 預設「最相關」只顯示互動較多的貼文，切成「最近」才會照時間顯示全部貼文，
// 藏在裡面的關鍵貼文才會跑出來。

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("nbSortToggle");
  const hiddenPost = document.getElementById("nbHiddenPost");
  if (!toggle || !hiddenPost) return;

  toggle.addEventListener("click", () => {
    const isRelevant = toggle.textContent.includes("最相關");
    if (isRelevant) {
      toggle.textContent = "排序方式：最近 ▾";
      hiddenPost.classList.remove("nb-post-hidden");
    } else {
      toggle.textContent = "排序方式：最相關 ▾";
      hiddenPost.classList.add("nb-post-hidden");
    }
  });
});
