(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── Year ────────────────────────────────────────────
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ── Skill Bar Targets ───────────────────────────────
  const skillRows = Array.from(document.querySelectorAll(".skill-row"));
  skillRows.forEach((row) => {
    const value = Number(row.getAttribute("data-level")) || 0;
    const clamped = Math.min(100, Math.max(0, value));
    row.style.setProperty("--target", `${clamped}%`);
  });

  // ── Skill Pill Index ────────────────────────────────
  const skillPills = Array.from(document.querySelectorAll(".skill-pills li"));
  skillPills.forEach((pill, index) => {
    pill.style.setProperty("--i", String(index + 1));
  });

  // ── Card Stagger Delay ──────────────────────────────
  const grids = document.querySelectorAll(".project-grid, .vibe-skill-grid");
  grids.forEach((grid) => {
    const cards = grid.children;
    for (let i = 0; i < cards.length; i++) {
      cards[i].style.setProperty("--card-delay", String(i));
    }
  });

  // ── Reveal Observer ─────────────────────────────────
  const revealTargets = Array.from(document.querySelectorAll(".reveal"));
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
  }

  // ── Progress Bar Observer ───────────────────────────
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    skillRows.forEach((row) => row.classList.add("animated"));
  } else {
    const progressObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("animated");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.45 }
    );

    skillRows.forEach((row) => progressObserver.observe(row));
  }

  // ── Tilt Cards ──────────────────────────────────────
  const tiltCards = Array.from(document.querySelectorAll(".tilt-card"));
  if (!prefersReducedMotion) {
    const maxTilt = 7;
    tiltCards.forEach((card) => {
      const reset = () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        card.style.setProperty("--mx", "50%");
        card.style.setProperty("--my", "50%");
      };

      reset();

      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * maxTilt * 2;
        const rotateX = (0.5 - py) * maxTilt * 2;
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        card.style.setProperty("--mx", `${(px * 100).toFixed(2)}%`);
        card.style.setProperty("--my", `${(py * 100).toFixed(2)}%`);
      });

      card.addEventListener("pointerleave", reset);
      card.addEventListener("blur", reset, true);
    });
  }

  // ── Card Links ──────────────────────────────────────
  const linkedCards = Array.from(document.querySelectorAll(".project-card[data-link]"));
  linkedCards.forEach((card) => {
    const link = card.getAttribute("data-link");
    if (!link) return;

    const go = () => {
      window.location.href = link;
    };

    card.addEventListener("click", (event) => {
      if (event.target instanceof HTMLElement && event.target.closest("a")) return;
      go();
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      go();
    });
  });

  // ── Smooth Scroll ───────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });

  // ── Scroll CSS Variable ─────────────────────────────
  let ticking = false;
  const updateScrollVars = () => {
    document.documentElement.style.setProperty("--scroll-y", String(window.scrollY || 0));
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateScrollVars);
    },
    { passive: true }
  );
  updateScrollVars();

  // ── Custom Cursor Disabled ──────────────────────────
  // Keep native cursor to avoid cross-browser cursor disappearance.
  const cursor = document.getElementById("cursor");
  const cursorDot = document.getElementById("cursor-dot");
  if (cursor) cursor.style.display = "none";
  if (cursorDot) cursorDot.style.display = "none";
  document.documentElement.style.cursor = "auto";
  document.body.style.cursor = "auto";
})();
