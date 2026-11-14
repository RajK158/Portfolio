import { useEffect, useRef } from "react";

export default function Effects() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0, h = 0;
    const resize = () => {
      const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      c.style.width = vw + "px";
      c.style.height = vh + "px";
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.floor(vw * dpr);
      c.height = Math.floor(vh * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      w = vw;
      h = vh;
    };

    window.addEventListener("resize", resize, { passive: true });
    resize();

    // Ambient floating particles
    const COUNT = 60;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1.0 + Math.random() * 2,
      vx: -0.2 + Math.random() * 0.4,
      vy: -0.2 + Math.random() * 0.4,
    }));

    // Mouse trailing interactive sparkles
    let sparkles = [];
    const maxSparkles = 40;

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;

      // Spawn sparkle particles on move
      if (sparkles.length < maxSparkles) {
        sparkles.push({
          x: e.clientX,
          y: e.clientY,
          r: 2 + Math.random() * 3,
          vx: -0.8 + Math.random() * 1.6,
          vy: -0.8 + Math.random() * 1.6,
          alpha: 1.0,
          color: Math.random() > 0.5 ? "--accent-300" : "--accent-600",
        });
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
    const colorTokens = () => ({
      glow1: css("--accent-600") || "#8b5cf6",
      glow2: css("--accent-300") || "#b191ff",
    });

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      const { glow1, glow2 } = colorTokens();

      // Ambient radial background glow
      const grad = ctx.createRadialGradient(w * 0.5, h * 0.2, 0, w * 0.5, h * 0.2, Math.max(w, h) * 0.85);
      grad.addColorStop(0, `${glow2}18`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Render & update ambient particles
      ctx.fillStyle = glow1;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.globalAlpha = 0.25;
        ctx.fill();
      }

      // Render & update mouse sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.025; // fade out speed

        if (s.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        const sColor = css(s.color) || glow2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = sColor;
        ctx.globalAlpha = s.alpha * 0.5;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none w-screen h-screen"
      style={{ opacity: 0.95 }}
    />
  );
}
