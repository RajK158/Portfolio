import { useEffect } from "react";

export default function EngineeringBackground() {
  useEffect(() => {
    const root = document.documentElement;
    const onMove = (event) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="engineering-bg" aria-hidden="true">
      <div className="engineering-bg-glow" />
      <div className="engineering-bg-pattern" />
      <div className="engineering-bg-cursor" />
    </div>
  );
}
