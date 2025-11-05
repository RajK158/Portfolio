import { useEffect, useRef } from "react";

export default function Effects() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

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

    const COUNT = 100;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1.2 + Math.random() * 2,
      vx: -0.3 + Math.random() * 0.6,
      vy: -0.3 + Math.random() * 0.6,
    }));

    const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
    const color = () => ({
      glow1: css("--accent-600") || "#8b5cf6",
      glow2: css("--accent-300") || "#b191ff",
    });

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      const { glow1, glow2 } = color();

      const grad = ctx.createRadialGradient(w * 0.5, h * 0.25, 0, w * 0.5, h * 0.25, Math.max(w, h) * 0.9);
      grad.addColorStop(0, `${glow2}33`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

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
        ctx.fillStyle = glow1;
        ctx.globalAlpha = 0.4;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none w-screen h-screen"
      style={{ opacity: 0.9 }}
    />
  );
}
