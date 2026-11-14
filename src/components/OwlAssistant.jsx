import { useEffect, useRef, useState } from "react";
import {
  profile,
  skills,
  skillFilters,
  featuredProjects,
  secondaryProjects,
  publication,
  experience,
  education,
} from "../data/portfolio.js";

function skillSummary() {
  return skillFilters
    .filter((filter) => filter.id !== "all")
    .map((filter) => {
      const names = skills
        .filter((skill) => skill.category === filter.id)
        .map((skill) => skill.name)
        .join(", ");
      return `${filter.label}: ${names}`;
    })
    .join(". ");
}

export default function OwlAssistant({ theme, setTheme }) {
  const EMAIL = profile.email;
  const RESUME_URL = profile.resumeUrl;

  // Position and dragging states
  // Start off-screen (-120, -120) so the owl can swoop in with an animation on load!
  const [position, setPosition] = useState({ x: -120, y: -120 }); 
  const [isDragging, setIsDragging] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [owlMood, setOwlMood] = useState("flying"); // flying, idle, coding, sleeping, happy, surprised
  const [isHopping, setIsHopping] = useState(false);
  const [headTilt, setHeadTilt] = useState("none"); // none, left, right
  const [greetBubbleVisible, setGreetBubbleVisible] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const [messages, setMessages] = useState(() => [
    {
      who: "owl",
      text: "Hoot! I'm Archimedes. Ask about the projects, skills, experience, and education listed on this page.",
    },
  ]);
  const [input, setInput] = useState("");

  const dragStartRef = useRef({ x: 0, y: 0 });
  const owlRef = useRef(null);
  const chatBottomRef = useRef(null);

  // Auto-scroll chat window
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Update activity timestamp on user interaction
  const recordActivity = () => {
    setLastActivity(Date.now());
  };

  // 1) Initial Swoop-in and Greeting Bubble on Load
  useEffect(() => {
    // Swoop in after 1 second
    const swoopTimer = setTimeout(() => {
      setOwlMood("flying");
      setPosition({ x: 24, y: 24 }); // Swoop to bottom-right corner

      setTimeout(() => {
        setOwlMood("happy");
        setGreetBubbleVisible(true);
        // Fade out the tiny greeting bubble after 9 seconds
        setTimeout(() => {
          setGreetBubbleVisible(false);
        }, 9000);
      }, 1400);
    }, 1000);

    return () => clearTimeout(swoopTimer);
  }, []);

  // 2) Realistic Idle Gestures (Head Tilting, Blinking)
  useEffect(() => {
    const tiltInterval = setInterval(() => {
      if (owlMood === "idle" && !isDragging) {
        const r = Math.random();
        if (r < 0.3) setHeadTilt("left");
        else if (r < 0.6) setHeadTilt("right");
        else setHeadTilt("none");
      }
    }, 6000);

    return () => clearInterval(tiltInterval);
  }, [owlMood, isDragging]);

  // 3) Autonomous Wandering (Patrols when user goes idle)
  useEffect(() => {
    const wanderInterval = setInterval(() => {
      const timeSinceInteract = Date.now() - lastActivity;
      
      // If idle for over 22 seconds and chat isn't open, wander around!
      if (timeSinceInteract > 22000 && !isChatOpen && !isDragging) {
        setOwlMood("flying");
        
        // Randomly pick a new screen corner
        const maxW = window.innerWidth - 100;
        const maxH = window.innerHeight - 110;
        
        const randomPositions = [
          { x: 24, y: 24 }, // Bottom Right
          { x: 24, y: maxH * 0.75 }, // Top Right
          { x: maxW * 0.8, y: 24 }, // Bottom Left
          { x: maxW * 0.8, y: maxH * 0.75 }, // Top Left
        ];
        
        const randomCoord = randomPositions[Math.floor(Math.random() * randomPositions.length)];
        setPosition(randomCoord);

        setTimeout(() => {
          setOwlMood("happy");
          setTimeout(() => setOwlMood("idle"), 1200);
        }, 1500);
      }
    }, 15000);

    return () => clearInterval(wanderInterval);
  }, [lastActivity, isChatOpen, isDragging]);

  // Eye tracking cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      recordActivity();
      if (!owlRef.current || isChatOpen === false) return;
      const rect = owlRef.current.getBoundingClientRect();
      const owlCenterX = rect.left + rect.width / 2;
      const owlCenterY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - owlCenterY, e.clientX - owlCenterX);
      const dist = Math.min(2.5, Math.hypot(e.clientX - owlCenterX, e.clientY - owlCenterY) / 100);

      setPupilOffset({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isChatOpen]);

  // Draggability Logic
  const handlePointerDown = (e) => {
    if (e.target.closest(".chat-panel") || e.target.closest("button") || e.target.closest("input")) return;
    
    recordActivity();
    setIsDragging(true);
    setOwlMood("surprised");
    
    dragStartRef.current = {
      x: e.clientX + position.x,
      y: e.clientY + position.y,
    };
    
    e.preventDefault();
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDragging) return;
      
      const newX = dragStartRef.current.x - e.clientX;
      const newY = dragStartRef.current.y - e.clientY;
      
      const padding = 10;
      const maxBoundX = window.innerWidth - 90;
      const maxBoundY = window.innerHeight - 100;
      
      setPosition({
        x: Math.max(padding, Math.min(maxBoundX, newX)),
        y: Math.max(padding, Math.min(maxBoundY, newY)),
      });
    };

    const handlePointerUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setOwlMood("idle");
      }
    };

    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging]);

  // Smooth scroll and highlight section helper
  const triggerNavigation = (selector) => {
    const element = document.querySelector(selector);
    if (!element) return false;
    
    recordActivity();
    const homeX = position.x;
    const homeY = position.y;

    // Trigger rapid flying wing flap
    setOwlMood("flying");

    // Swoop glide to screen center coordinates
    const midX = window.innerWidth / 2 - 38;
    const midY = window.innerHeight / 2 - 43;
    setPosition({ x: midX, y: midY });

    // Execute smooth scroll
    setTimeout(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      element.classList.add("section-pulse-active");
    }, 400);

    // Glide back home
    setTimeout(() => {
      setPosition({ x: homeX, y: homeY });
      setOwlMood("happy");
      setTimeout(() => {
        setOwlMood("idle");
        element.classList.remove("section-pulse-active");
      }, 1200);
    }, 1800);
    
    return true;
  };

  // Upgraded smart NLP Conversational Router
  const handleQuery = async (queryText) => {
    if (!queryText.trim()) return;
    const cleanQuery = queryText.trim();
    const lower = cleanQuery.toLowerCase();

    recordActivity();
    setMessages((m) => [...m, { who: "you", text: cleanQuery }]);
    setIsTyping(true);
    setOwlMood("coding");

    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));

    let reply = "";
    let actionLabel = "";
    let actionHandler = null;

    // Direct Intent Matching
    const degreeList = education
      .map((item) => `${item.degree} at ${item.school} (${item.period})`)
      .join("; ");
    const roleList = experience
      .map((item) => `${item.title} at ${item.company} (${item.period})`)
      .join("; ");
    const projectList = featuredProjects.map((item) => item.title).join(", ");
    const additionalList = secondaryProjects.map((item) => item.title).join(", ");

    if (lower.includes("graduat") || lower.includes("finish") || lower.includes("complete") || lower.includes("timeline") || lower.includes("december") || lower.includes("2026") || lower.includes("when do you")) {
      reply = `The academic timeline lists ${degreeList}. The page also says ${profile.name.split(" ")[0]} is ${profile.availability.toLowerCase()}.`;
      actionLabel = "View Education Section 🎓";
      actionHandler = () => triggerNavigation("#education");
      setOwlMood("happy");
    }
    else if (lower.includes("hello") || lower.includes("hi ") || lower === "hi" || lower.includes("hey") || lower.includes("greet")) {
      reply = "Hoot! Hello. I can point you to the projects, skills, experience, and education on this page.";
      setOwlMood("happy");
    }
    else if (lower.includes("paper") || lower.includes("spammer") || lower.includes("research") || lower.includes("publication")) {
      reply = `${publication.title} is listed as a ${publication.venue} paper by ${publication.authors}.`;
      actionLabel = "View Publication";
      actionHandler = () => triggerNavigation("#research");
      setOwlMood("happy");
    }
    else if (lower.includes("project") || lower.includes("ruptiq") || lower.includes("vitalex") || lower.includes("impulso") || lower.includes("pharma") || lower.includes("copilot") || lower.includes("extractor") || lower.includes("invoice") || lower.includes("velora") || lower.includes("bistro")) {
      reply = `Featured projects are ${projectList}. ${additionalList} is listed as an additional project.`;
      actionLabel = "View Projects";
      actionHandler = () => triggerNavigation("#projects");
      setOwlMood("happy");
    }
    else if (lower.includes("experience") || lower.includes("job") || lower.includes("work") || lower.includes("employer") || lower.includes("zoho") || lower.includes("cloudtool") || lower.includes("qspiders") || lower.includes("professional")) {
      reply = `The experience section lists ${roleList}.`;
      actionLabel = "View Experience Timeline 💼";
      actionHandler = () => triggerNavigation("#experience");
      setOwlMood("happy");
    }
    else if (lower.includes("education") || lower.includes("study") || lower.includes("degree") || lower.includes("college") || lower.includes("university") || lower.includes("csulb") || lower.includes("long beach") || lower.includes("gpa")) {
      reply = `The academic timeline lists ${degreeList}.`;
      actionLabel = "View Academic Path 🎓";
      actionHandler = () => triggerNavigation("#education");
      setOwlMood("happy");
    }
    else if (lower.includes("resume") || lower.includes("cv")) {
      reply = "The resume link on this page opens the Overleaf document.";
      actionLabel = "Open Resume 📄";
      actionHandler = () => window.open(RESUME_URL, "_blank");
      setOwlMood("happy");
    }
    else if (lower.includes("skill") || lower.includes("stack") || lower.includes("language") || lower.includes("python") || lower.includes("react") || lower.includes("fastapi") || lower.includes("tech")) {
      reply = `The skills section lists ${skillSummary()}.`;
      actionLabel = "Highlight Skills Showcase ⚡";
      actionHandler = () => triggerNavigation("#skills");
      setOwlMood("happy");
    }
    else if (lower.includes("contact") || lower.includes("reach") || lower.includes("email") || lower.includes("linkedin") || lower.includes("hire") || lower.includes("github")) {
      reply = `Email ${EMAIL}, or use the GitHub and LinkedIn links in the contact section.`;
      actionLabel = "Fly to Contact 📬";
      actionHandler = () => triggerNavigation("#contact");
      setOwlMood("happy");
    }
    else if (lower.includes("who are you") || lower.includes("name") || lower.includes("owl") || lower.includes("why")) {
      reply = "I am Archimedes, the companion owl on this page. I can take you to the projects, skills, experience, education, or contact section.";
      setOwlMood("happy");
    }
    else if (lower.includes("hobby") || lower.includes("interest") || lower.includes("fun") || lower.includes("joke")) {
      reply = "This page does not list personal interests. I can show the projects, skills, or experience sections.";
      setOwlMood("happy");
    }
    else {
      reply = `${profile.name} is an M.S. Computer Science student at California State University, Long Beach. The page focuses on backend systems, distributed-systems tooling, and AI-assisted applications. Try one of the buttons below.`;
      setOwlMood("idle");
    }

    setIsTyping(false);
    setMessages((m) => [
      ...m,
      {
        who: "owl",
        text: reply,
        actionLabel,
        actionHandler,
      },
    ]);
  };

  const handleChipClick = (topic) => {
    let chipText = "";
    if (topic === "projects") chipText = "Show me your projects";
    else if (topic === "experience") chipText = "Tell me about your work experience";
    else if (topic === "skills") chipText = "What is your tech stack?";
    else if (topic === "education") chipText = "Where did you study?";
    else if (topic === "resume") chipText = "Can I see your resume?";
    else if (topic === "contact") chipText = "How can I contact you?";
    
    handleQuery(chipText);
  };

  const handleOwlClick = () => {
    recordActivity();
    if (!isDragging) {
      // Trigger temporary hop effect
      setIsHopping(true);
      setTimeout(() => setIsHopping(false), 460);

      // Open/close Chat window
      setIsChatOpen(!isChatOpen);
      setGreetBubbleVisible(false); // Close greeting bubble
      setOwlMood(isChatOpen ? "idle" : "happy");
    }
  };

  return (
    <div
      ref={owlRef}
      className="fixed z-50 flex flex-col items-end select-none pointer-events-auto"
      style={{
        right: `${position.x}px`,
        bottom: `${position.y}px`,
        touchAction: "none",
        transition: isDragging ? "none" : "all 1.4s cubic-bezier(0.19, 1, 0.22, 1)",
      }}
    >
      {/* 1) Greet Speech Bubble (Visible on page load to say hello proactively!) */}
      {greetBubbleVisible && !isChatOpen && (
        <div className="absolute top-[-70px] right-2 bg-gradient-to-r from-[var(--accent-600)] to-[var(--accent-500)] text-white text-[11px] font-semibold px-4 py-2.5 rounded-2xl shadow-xl whitespace-nowrap animate-bounce border border-white/20 select-none">
          Hoot! Welcome! Ask me about the projects 🎓
          {/* Bubble tail */}
          <span className="absolute bottom-[-6px] right-8 w-3 h-3 bg-[var(--accent-600)] rotate-45 border-r border-b border-white/25" />
        </div>
      )}

      {/* 2) Conversational Chat Panel */}
      {isChatOpen && (
        <div className="chat-panel mb-4 w-[330px] sm:w-[380px] rounded-3xl border border-white/10 bg-[var(--card)] backdrop-blur-xl shadow-2xl p-4 flex flex-col justify-between max-h-[420px] overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-white/5 pb-2.5 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-base">🦉</span>
              <div>
                <h4 className="text-xs font-bold text-[var(--fg)]">Archimedes</h4>
                <p className="text-[10px] text-[var(--muted)]">Patrolling • Portfolio guide</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  recordActivity();
                  setTheme(theme === "dark" ? "light" : "dark");
                }}
                className="text-xs p-1 hover:bg-white/5 rounded transition"
                title="Toggle Theme"
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
              <button
                onClick={() => {
                  setIsChatOpen(false);
                  setOwlMood("idle");
                }}
                className="text-xs p-1 hover:bg-white/5 rounded text-[var(--muted)] hover:text-[var(--fg)] transition"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[220px] text-xs">
            {messages.map((m, i) => (
              <div key={i} className={m.who === "you" ? "text-right" : "text-left"}>
                <div
                  className={`inline-block px-3 py-2 rounded-2xl max-w-[85%] border leading-relaxed ${
                    m.who === "you"
                      ? "border-[var(--accent-600)]/40 bg-[var(--accent-600)]/15 text-[var(--fg)] rounded-tr-none"
                      : "border-white/5 bg-white/5 text-[var(--fg)]/90 rounded-tl-none"
                  }`}
                >
                  {m.text}

                  {m.actionLabel && m.actionHandler && (
                    <button
                      onClick={m.actionHandler}
                      className="block mt-2.5 px-3 py-1.5 w-full text-center rounded-xl bg-[var(--accent-600)]/20 hover:bg-[var(--accent-600)]/40 border border-[var(--accent-600)]/45 text-[var(--accent-300)] font-bold text-[10px] uppercase tracking-wider transition"
                    >
                      {m.actionLabel}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-left flex items-center gap-1.5 text-[var(--muted)] pl-2">
                <span>typing</span>
                <span className="flex gap-0.5">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick chips */}
          <div className="mt-3 flex flex-wrap gap-1.5 max-h-[80px] overflow-y-auto pt-1.5 border-t border-white/5">
            {["projects", "skills", "experience", "education", "resume", "contact"].map((topic) => (
              <button
                key={topic}
                onClick={() => handleChipClick(topic)}
                className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-[var(--muted)] hover:text-[var(--accent-300)] hover:border-[var(--accent-600)]/30 transition"
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleQuery(input);
              setInput("");
            }}
            className="mt-3 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills, or experience..."
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/10 outline-none text-[var(--fg)] placeholder-[var(--muted)]/50 focus:border-[var(--accent-600)]/50 transition"
            />
            <button
              type="submit"
              className="px-3 py-2 text-xs font-bold rounded-xl bg-[var(--accent-600)]/20 hover:bg-[var(--accent-600)]/30 border border-[var(--accent-600)]/40 text-[var(--accent-300)] transition"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* 3) Floating Draggable SVG Owl Character */}
      <div
        className={`flex flex-col items-center cursor-grab active:cursor-grabbing relative group ${
          isHopping ? "owl-hopped" : ""
        } ${isDragging ? "scale-105" : "hover:scale-105"} transition-transform duration-300`}
        onPointerDown={handlePointerDown}
        onClick={handleOwlClick}
      >
        {/* Animated container */}
        <div className="owl-floating owl-breathing relative w-[76px] h-[86px]">
          <svg
            viewBox="0 0 100 110"
            className="w-full h-full drop-shadow-[0_4px_12px_rgba(124,58,237,0.3)] transition-all duration-300"
          >
            {/* SVG Group - Cute active Head Tilting when idle */}
            <g className={headTilt === "left" ? "owl-tilt-left" : headTilt === "right" ? "owl-tilt-right" : ""}>
              
              {/* Feathers highlights / Ears */}
              <path
                d="M15,40 Q10,15 35,22 Q50,20 65,22 Q90,15 85,40 Z"
                fill="var(--owl-body)"
              />

              {/* Left and Right Wings */}
              <path
                d="M16,50 C1,55 5,85 18,92 C14,75 14,60 16,50 Z"
                fill="var(--owl-body)"
                className={owlMood === "flying" ? "owl-flying-l" : "owl-wing-l"}
              />
              <path
                d="M84,50 C99,55 95,85 82,92 C86,75 86,60 84,50 Z"
                fill="var(--owl-body)"
                className={owlMood === "flying" ? "owl-flying-r" : "owl-wing-r"}
              />

              {/* Body */}
              <ellipse cx="50" cy="65" rx="34" ry="40" fill="var(--owl-body)" />

              {/* Belly patch */}
              <ellipse cx="50" cy="72" rx="23" ry="28" fill="var(--owl-belly)" />

              {/* Belly feathers markings */}
              <path d="M43,62 Q50,68 57,62 M41,72 Q50,78 59,72 M43,82 Q50,88 57,82" stroke="var(--owl-body)" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.3" />

              {/* Eyeglasses spectacles */}
              {owlMood === "coding" && (
                <g stroke="var(--owl-beak)" strokeWidth="2" fill="none" opacity="0.8" className="z-10">
                  <circle cx="34" cy="45" r="14" />
                  <circle cx="66" cy="45" r="14" />
                  <line x1="48" y1="45" x2="52" y2="45" />
                </g>
              )}

              {/* Eyes */}
              <g className="owl-eyes">
                <circle cx="34" cy="45" r="13" fill="white" />
                <circle cx="66" cy="45" r="13" fill="white" />

                {owlMood !== "sleeping" ? (
                  <>
                    <circle
                      cx={34 + pupilOffset.x}
                      cy={45 + pupilOffset.y}
                      r={owlMood === "surprised" ? 4 : 5.5}
                      fill="var(--bg)"
                    />
                    <circle
                      cx={34 + pupilOffset.x - 1.5}
                      cy={45 + pupilOffset.y - 1.5}
                      r="1.5"
                      fill="white"
                    />
                    
                    <circle
                      cx={66 + pupilOffset.x}
                      cy={45 + pupilOffset.y}
                      r={owlMood === "surprised" ? 4 : 5.5}
                      fill="var(--bg)"
                    />
                    <circle
                      cx={66 + pupilOffset.x - 1.5}
                      cy={45 + pupilOffset.y - 1.5}
                      r="1.5"
                      fill="white"
                    />
                  </>
                ) : (
                  <>
                    <path d="M25,45 Q34,51 43,45" stroke="var(--muted)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                    <path d="M57,45 Q66,51 75,45" stroke="var(--muted)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  </>
                )}
              </g>

              {/* Rosy cheeks */}
              <ellipse cx="23" cy="54" rx="4" ry="2.5" fill="#f87171" opacity="0.6" />
              <ellipse cx="77" cy="54" rx="4" ry="2.5" fill="#f87171" opacity="0.6" />

              {/* Beak */}
              <polygon
                points="50,48 44,56 56,56"
                fill="var(--owl-beak)"
                className="transition-transform duration-300 origin-center"
                style={{ transform: owlMood === "happy" ? "scale(1.2)" : "scale(1)" }}
              />

              {/* Claws feet */}
              <path d="M30,103 Q33,98 36,103 M36,103 Q39,98 42,103" stroke="var(--owl-beak)" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M58,103 Q61,98 64,103 M64,103 Q67,98 70,103" stroke="var(--owl-beak)" strokeWidth="4" strokeLinecap="round" fill="none" />

            </g>
          </svg>
        </div>

        {/* Floating instruction bubble on hover */}
        {!isChatOpen && (
          <div className="absolute top-[-30px] bg-[var(--card)] border border-white/10 px-2.5 py-1 rounded-xl text-[10px] font-bold text-[var(--accent-300)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap uppercase tracking-wider backdrop-blur-md">
            Click to Chat 🦉
          </div>
        )}
      </div>
    </div>
  );
}
