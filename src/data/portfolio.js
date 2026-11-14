export const profile = {
  name: "Raj Kundur",
  email: "rajkundur58@gmail.com",
  resumeUrl: "https://www.overleaf.com/read/bjgjkwdfpxpp#c21205",
  linkedinUrl: "https://www.linkedin.com/in/rajkundur/",
  githubUrl: "https://github.com/RajK158",
  availability: "Available for Internships & Co-ops",
  roleLine: "M.S. Computer Science student at California State University, Long Beach.",
  intro:
    "I build backend services, distributed-systems tooling, and AI-assisted applications. Recent work includes a Go load-testing workflow, a healthcare policy workspace, and pipelines for documents and job applications.",
};

export const highlights = [
  { label: "Degree", value: "M.S. Computer Science" },
  { label: "School", value: "CSU Long Beach" },
  { label: "Location", value: "Long Beach, California" },
  { label: "Focus", value: "Backend, Distributed Systems, Applied AI", accent: true },
];

export const skillFilters = [
  { id: "all", label: "All" },
  { id: "languages", label: "Languages" },
  { id: "backend", label: "Backend" },
  { id: "frontend", label: "Frontend" },
  { id: "data", label: "Data" },
  { id: "cloud", label: "Cloud" },
  { id: "aiml", label: "AI/ML" },
  { id: "testing", label: "Testing" },
];

export const skillCategoryLabels = {
  languages: "Languages",
  backend: "Backend",
  frontend: "Frontend",
  data: "Data",
  cloud: "Cloud",
  aiml: "AI/ML",
  testing: "Testing",
};

export const skills = [
  { name: "Go", category: "languages" },
  { name: "Python", category: "languages" },
  { name: "TypeScript", category: "languages" },
  { name: "JavaScript", category: "languages" },
  { name: "SQL", category: "languages" },
  { name: "FastAPI", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "Next.js", category: "backend" },
  { name: "SQLAlchemy", category: "backend" },
  { name: "React", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "React Native", category: "frontend" },
  { name: "Expo", category: "frontend" },
  { name: "Chrome Manifest V3", category: "frontend" },
  { name: "PostgreSQL", category: "data" },
  { name: "Supabase", category: "data" },
  { name: "SQLite", category: "data" },
  { name: "Whoosh", category: "data" },
  { name: "Docker", category: "cloud" },
  { name: "GitHub Actions", category: "cloud" },
  { name: "Git", category: "cloud" },
  { name: "Vercel", category: "cloud" },
  { name: "Google Gemini", category: "aiml" },
  { name: "OpenAI API", category: "aiml" },
  { name: "Hugging Face Inference", category: "aiml" },
  { name: "Sentence Transformers", category: "aiml" },
  { name: "FAISS", category: "aiml" },
  { name: "spaCy", category: "aiml" },
  { name: "Tesseract OCR", category: "aiml" },
  { name: "EasyOCR", category: "aiml" },
  { name: "k6", category: "testing" },
  { name: "Prometheus", category: "testing" },
  { name: "pytest", category: "testing" },
];

export const featuredProjects = [
  {
    id: "ruptiq",
    title: "Ruptiq",
    tag: "In development",
    tech: "Go, k6, Prometheus",
    status: "Development CLI",
    summary:
      "Go CLI that saves a k6 load-test baseline and a later run, then compares the target's Prometheus telemetry after a change made outside the tool.",
    detail:
      "The before and after stages start an external k6 HTTP GET workload and sample a Prometheus endpoint on an interval. Compare, investigation, and validation then run offline on the saved diagnosis files. Evidence pointers and SHA-256 hashes tie each comparison back to the files that were judged.",
    code: "https://github.com/RajK158/ruptiq",
  },
  {
    id: "vitalex",
    title: "VitaLex",
    tag: "MVP",
    tech: "Next.js, TypeScript, Supabase, PostgreSQL, Gemini",
    status: "MVP",
    summary:
      "Healthcare policy workspace for uploading operational documents, summarizing them, generating structured rules, and comparing versions.",
    detail:
      "The Next.js app uses Supabase for authentication, PostgreSQL, and file storage. Gemini produces summaries, if-then rules, and version comparisons. Users can export rules, update approval status, and review audit activity, with role checks in the interface and API routes.",
    live: "https://vitalex.vercel.app",
    code: "https://github.com/RajK158/VitaLex",
  },
  {
    id: "impulso",
    title: "Impulso",
    tag: "Beta",
    tech: "JavaScript, Manifest V3, FastAPI, Python",
    status: "Early development",
    summary:
      "Chrome extension and FastAPI backend for keeping an application profile, reading a job description, filling known forms, and tailoring resume content.",
    detail:
      "The Manifest V3 side panel stores profile data in the browser and includes autofill adapters for Greenhouse, Lever, Ashby, Workday, and SmartRecruiters. The API extracts resume text and uses a configurable Gemini or OpenAI provider for job analysis and resume tailoring. The repository is still named BrandFit-Resume.",
    code: "https://github.com/RajK158/BrandFit-Resume",
  },
  {
    id: "invoice-extractor",
    title: "Multi-Language Invoice Extractor",
    tag: "Local app",
    tech: "Python, Tesseract, EasyOCR, spaCy, Whoosh, FastAPI, Streamlit",
    status: "Local application",
    summary:
      "Pipeline that turns invoice images and PDFs into structured fields, then validates, searches, and exports the results.",
    detail:
      "Tesseract is the primary OCR engine, with EasyOCR as a fallback. Extraction uses regex patterns and spaCy named entities, then checks arithmetic, dates, and duplicates. Records go through SQLAlchemy and a Whoosh index for filtered search. Streamlit and FastAPI cover upload, batch processing, search, and CSV or JSON export.",
    code: "https://github.com/RajK158/Invoice-Extractor",
  },
  {
    id: "pharma-copilot",
    title: "Pharma Copilot",
    tag: "Prototype",
    tech: "FastAPI, React, Sentence Transformers, FAISS, Hugging Face",
    status: "Local prototype",
    summary:
      "Web app that drafts specialist-oriented readings of a medical report and retrieves similar stored cases.",
    detail:
      "The API runs cardiology, pulmonology, and psychology prompts through the Hugging Face Inference API and merges them into one summary. Similar-case lookup embeds reports with Sentence Transformers and searches a FAISS index when that local index is available. A separate route ranks a local case file by cosine similarity.",
    code: "https://github.com/RajK158/pharma-copilot-ai",
  },
];

export const secondaryProjects = [
  {
    id: "velora",
    title: "Velora Bistro",
    tag: "Internship build",
    tech: "React Native, Expo, TypeScript, Express, Zod, OpenAI",
    status: "Internship challenge",
    summary:
      "Mobile ordering app that turns a conversation with a dining assistant into structured cart updates.",
    detail:
      "Built for the Viridien AI Full-Stack Engineering Internship challenge. The Expo client browses a menu and keeps a live order ticket. The Express API requests JSON cart actions from OpenAI, validates them with Zod, and falls back to a local parser when the key is missing or the model response fails.",
    walkthrough: "https://www.loom.com/share/748745cb18b141979c42612422ca5155",
    code: "https://github.com/RajK158/Intelligent-Bistro",
  },
];

export const publication = {
  title: "Detecting Spammers on Social Media Using Machine Learning Methodologies",
  venue: "International Journal of Research and Analytical Reviews (IJRAR), Vol. 10, Issue 1, February 2023",
  authors: "Ashwini G. Kamble, Prajakta Kudale, Raj Kundur, and Dipti Shinde",
  summary:
    "Co-authored paper on classifying social-media messages as spam with machine-learning methods and behavioral and linguistic features. The paper lists KJ College of Engineering and Management Research, Pune.",
  href: "https://ijrar.org/papers/IJRAR23A1860.pdf",
};

export const experience = [
  {
    title: "Software Engineer",
    company: "California State University, Long Beach",
    period: "Jan 2025 — Present",
    desc: "Designing and developing robust enterprise services, automating student records integrations, and engineering custom database models to optimize workflow latency.",
  },
  {
    title: "Software Developer",
    company: "Cloudtool - (Zoho Partner)",
    period: "Sept 2023 — Nov 2024",
    desc: "Built scalable integrations and custom features on top of core Zoho application services, increasing client synchronization automation by 40% and deploying full-stack client portals.",
  },
  {
    title: "Full Stack Software Developer",
    company: "QSpiders",
    period: "Feb 2023 — August 2023",
    desc: "Developed responsive full-stack features using React, Node.js, and SQL, implementing dynamic dashboards and API endpoints for internal platforms.",
  },
];

export const education = [
  {
    degree: "Master's in Computer Science",
    school: "California State University Long Beach",
    period: "Jan 2025 — Dec 2026",
    note: "Specializing in Intelligent Systems, Advanced Software Engineering, and AI agents",
  },
  {
    degree: "Bachelor's in Computer Engineering",
    school: "Savitribai Phule Pune University",
    period: "Jan 2020 — June 2023",
    note: "Core engineering fundamentals, Algorithms, Systems Architecture, and spam classification research",
  },
];
