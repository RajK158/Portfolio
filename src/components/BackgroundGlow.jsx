export default function BackgroundGlow() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background:
          "radial-gradient(60% 40% at 50% 20%, rgba(177,145,255,0.28) 0%, rgba(0,0,0,0) 60%), radial-gradient(50% 35% at 80% 0%, rgba(155,105,255,0.18) 0%, rgba(0,0,0,0) 60%), radial-gradient(45% 30% at 10% 10%, rgba(155,105,255,0.12) 0%, rgba(0,0,0,0) 60%)",
        mixBlendMode: "screen",
      }}    
    />
  );
}
