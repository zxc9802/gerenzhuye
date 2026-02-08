(() => {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mouse = { x: -9999, y: -9999, active: false };
  const particles = [];
  let width = 0;
  let height = 0;
  let dpr = 1;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const rand = (min, max) => Math.random() * (max - min) + min;

  const getTargetCount = () => {
    const base = Math.floor((width * height) / 19000);
    const safe = clamp(base, 40, 110);
    return reduceMotion ? Math.floor(safe * 0.6) : safe;
  };

  const spawnParticle = () => ({
    x: rand(0, width),
    y: rand(0, height),
    vx: rand(-0.2, 0.2),
    vy: rand(-0.2, 0.2),
    r: rand(0.7, 1.9),
    alpha: rand(0.25, 0.92)
  });

  const syncCount = () => {
    const target = getTargetCount();
    while (particles.length < target) particles.push(spawnParticle());
    while (particles.length > target) particles.pop();
  };

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = clamp(window.devicePixelRatio || 1, 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    syncCount();
  };

  const resetIfOutOfView = (p) => {
    if (p.x < -20) p.x = width + 20;
    if (p.x > width + 20) p.x = -20;
    if (p.y < -20) p.y = height + 20;
    if (p.y > height + 20) p.y = -20;
  };

  const updateParticle = (p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (mouse.active) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const distSq = dx * dx + dy * dy;
      const forceRadius = 180;
      if (distSq < forceRadius * forceRadius) {
        const dist = Math.max(1, Math.sqrt(distSq));
        const pull = (1 - dist / forceRadius) * 0.02;
        p.x += (dx / dist) * pull * 10;
        p.y += (dy / dist) * pull * 10;
      }
    }

    resetIfOutOfView(p);
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(166, 226, 255, ${p.alpha})`;
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i += 1) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j += 1) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 90) {
          const opacity = (1 - dist / 90) * 0.22;
          ctx.strokeStyle = `rgba(121, 224, 255, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
  };

  const tick = () => {
    if (!reduceMotion) {
      for (let i = 0; i < particles.length; i += 1) updateParticle(particles[i]);
    }
    draw();
    window.requestAnimationFrame(tick);
  };

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener(
    "pointermove",
    (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    },
    { passive: true }
  );
  window.addEventListener(
    "pointerleave",
    () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    },
    { passive: true }
  );

  resize();
  tick();
})();
