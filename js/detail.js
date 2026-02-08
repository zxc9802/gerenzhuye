(() => {
  const data = window.DETAIL_DATA || {};
  const params = new URLSearchParams(window.location.search);
  const itemId = params.get("item") || "";
  const detail = data[itemId];

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = value || "";
  };

  if (!detail) {
    setText("detail-category", "项目详情");
    setText("detail-title", "未找到项目");
    setText("detail-tagline", "请返回主页重新选择项目卡片。");
    setText("detail-status", "状态：无");
    setText("detail-source", "来源：无");
    return;
  }

  document.title = `${detail.title} | Vibe Coder`;
  setText("detail-category", detail.category);
  setText("detail-title", detail.title);
  setText("detail-tagline", detail.tagline);
  setText("detail-summary", detail.summary);
  setText("detail-positioning", detail.positioning);

  const specialNoteEl = document.getElementById("detail-special-note");
  if (specialNoteEl) {
    if (detail.specialNote) {
      specialNoteEl.hidden = false;
      specialNoteEl.textContent = `特别说明：${detail.specialNote}`;
    } else {
      specialNoteEl.hidden = true;
      specialNoteEl.textContent = "";
    }
  }

  const linkContainer = document.getElementById("detail-links");
  if (linkContainer) {
    linkContainer.innerHTML = "";
    const addLink = (label, url) => {
      if (!url) return;
      const a = document.createElement("a");
      a.className = "detail-link-btn";
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = label;
      linkContainer.appendChild(a);
    };
    addLink("GitHub 仓库", detail.repoUrl);
    addLink("在线地址", detail.siteUrl);
  }

  const renderList = (id, values, ordered = false) => {
    const container = document.getElementById(id);
    if (!container) return;
    container.innerHTML = "";
    (values || []).forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      container.appendChild(li);
    });
    if (ordered) container.setAttribute("start", "1");
  };

  renderList("detail-modules", detail.modules, false);
  renderList("detail-flow", detail.flow, true);
  renderList("detail-stack", detail.stack, false);
})();
