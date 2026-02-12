(() => {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const countEl = document.getElementById("projects-count");
  const filterButtons = Array.from(document.querySelectorAll(".filter-btn[data-filter]"));
  const dataEntries = Object.entries(window.DETAIL_DATA || {}).map(([id, item]) => ({
    id,
    ...item
  }));

  let activeFilter = "all";

  const normalizeType = (category) => {
    if (!category) return "web";
    return category.includes("Skill") ? "skill" : "web";
  };

  const typeLabel = (type) => (type === "skill" ? "Skill" : "网站");

  const toShortLine = (text, maxLength = 42) => {
    const source = (text || "").trim();
    if (!source) return "查看项目详情与实现路径。";
    if (source.length <= maxLength) return source;
    return `${source.slice(0, maxLength)}…`;
  };

  const setCount = (count) => {
    if (!countEl) return;
    countEl.textContent = `共 ${count} 个项目`;
  };

  const createCard = (item) => {
    const type = normalizeType(item.category);

    const card = document.createElement("article");
    card.className = "project-card";
    card.setAttribute("data-link", `detail.html?item=${item.id}`);
    card.setAttribute("role", "link");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `查看 ${item.title} 详情`);

    const meta = document.createElement("div");
    meta.className = "project-meta";

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = typeLabel(type);

    meta.appendChild(tag);

    const title = document.createElement("h3");
    title.className = "project-title";
    title.textContent = item.title || "未命名项目";

    const desc = document.createElement("p");
    desc.className = "project-desc";
    desc.textContent = toShortLine(item.tagline || item.summary, 44);

    const link = document.createElement("a");
    link.className = "card-link";
    link.href = `detail.html?item=${item.id}`;
    link.textContent = "查看详情";

    card.appendChild(meta);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(link);

    return card;
  };

  const applyFilterButtonState = () => {
    filterButtons.forEach((button) => {
      const isActive = button.getAttribute("data-filter") === activeFilter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  };

  const render = () => {
    const filtered = dataEntries.filter((item) => {
      if (activeFilter === "all") return true;
      return normalizeType(item.category) === activeFilter;
    });

    grid.innerHTML = "";

    if (!filtered.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "当前筛选下没有项目。";
      grid.appendChild(empty);
      setCount(0);
      return;
    }

    filtered.forEach((item, index) => {
      const card = createCard(item);
      card.style.setProperty("--card-delay", String(index));
      grid.appendChild(card);
    });

    setCount(filtered.length);
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextFilter = button.getAttribute("data-filter") || "all";
      if (nextFilter === activeFilter) return;
      activeFilter = nextFilter;
      applyFilterButtonState();
      render();
    });
  });

  applyFilterButtonState();
  render();
})();
