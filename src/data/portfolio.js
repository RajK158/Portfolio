export const profile = {
  name: "Raj Kundur",
  email: "rajkundur58@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/rajkundur/",
  githubUrl: "https://github.com/RajK158",
  availability: "Open to Full-Time Software Engineering Opportunities",
  roleLine: "M.S. Computer Science, California State University, Long Beach.",
  intro:
    "I build backend services, distributed-systems tooling, and AI-assisted applications. Recent work includes a Go load-testing workflow, a healthcare policy workspace, and pipelines for documents and job applications.",
};

export const featuredSkillNames = [
  "Java",
  "Python",
  "TypeScript",
  "Go",
  "React",
  "FastAPI",
  "PostgreSQL",
  "Docker",
];

export const skillGroups = [
  {
    id: "languages",
    label: "Languages",
    items: ["Java", "Python", "C++", "JavaScript", "TypeScript", "Go", "Shell"],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["Node.js", "Express", "FastAPI", "Spring Boot"],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: ["React", "Next.js", "Angular", "Vue", "Tailwind CSS", "React Native"],
  },
  {
    id: "data",
    label: "Data",
    items: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "Oracle/PLSQL", "Redis", "Supabase"],
  },
  {
    id: "cloud",
    label: "Cloud and infrastructure",
    items: ["AWS", "Microsoft Azure", "Google Cloud Platform", "Docker", "Kubernetes", "Kafka", "Git", "Jenkins"],
  },
  {
    id: "aiml",
    label: "Applied AI",
    items: ["Google Gemini", "OpenAI API", "Hugging Face Inference", "Sentence Transformers", "FAISS"],
  },
  {
    id: "testing",
    label: "Testing and observability",
    items: ["JUnit", "PyTest", "Selenium", "Playwright", "Postman", "k6", "Prometheus", "Grafana"],
  },
];

export const featuredProjects = [
  {
    id: "ruptiq",
    title: "Ruptiq",
    period: "Nov 2026 – Present",
    tag: "In development",
    tech: "Go, k6, Prometheus",
    status: "Development CLI",
    card:
      "Go-based performance testing toolkit that runs k6 workloads, collects Prometheus telemetry, and compares saved baseline and follow-up runs.",
    stack: ["Go", "k6", "Prometheus"],
    summary:
      "Go CLI that saves a k6 load-test baseline and a later run, then compares the target's Prometheus telemetry after a change made outside the tool.",
    detail:
      "The before and after stages start an external k6 HTTP GET workload and sample a Prometheus endpoint on an interval. Compare, investigation, and validation then run offline on the saved diagnosis files. Evidence pointers and SHA-256 hashes tie each comparison back to the files that were judged.",
    code: "https://github.com/RajK158/ruptiq",
  },
  {
    id: "vitalex",
    title: "VitaLex",
    period: "Apr 2026",
    tag: "MVP",
    tech: "Next.js, TypeScript, Supabase, PostgreSQL, Gemini",
    status: "MVP",
    card:
      "Healthcare policy workspace for uploading documents, generating Gemini summaries and rules, and comparing versions.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Gemini"],
    summary:
      "Healthcare policy workspace for uploading operational documents, summarizing them, generating structured rules, and comparing versions.",
    detail:
      "The Next.js app uses Supabase for authentication, PostgreSQL, and file storage. Gemini produces summaries, if-then rules, and version comparisons. Users can export rules, update approval status, and review audit activity, with role checks in the interface and API routes.",
    image: "/projects/vitalex.jpg",
    imageAlt:
      "VitaLex dashboard with the upload heading and impact counts: 2 documents uploaded, 2 summaries, 12 rules, 5 high-risk rules, and 0 comparisons.",
    live: "https://vitalex.vercel.app",
    code: "https://github.com/RajK158/VitaLex",
  },
  {
    id: "impulso",
    title: "Impulso",
    period: "May 2026 – Sep 2026",
    tag: "Beta",
    tech: "JavaScript, Manifest V3, FastAPI, Python",
    status: "Early development",
    card:
      "Chrome extension and FastAPI backend that keeps an application profile, reads a job description, and fills supported ATS forms.",
    stack: ["JavaScript", "Manifest V3", "FastAPI", "Python"],
    summary:
      "Chrome extension and FastAPI backend for keeping an application profile, reading a job description, filling known forms, and tailoring resume content.",
    detail:
      "The Manifest V3 side panel stores profile data in the browser and includes autofill adapters for Greenhouse, Lever, Ashby, Workday, and SmartRecruiters. The API extracts resume text and uses a configurable Gemini or OpenAI provider for job analysis and resume tailoring. The repository is still named BrandFit-Resume.",
    image: "/projects/impulso.jpg",
    imageAlt:
      "Impulso side panel on the Job tab, with Extract Current Job, Replace Current Job, and Clear Current Job.",
    code: "https://github.com/RajK158/BrandFit-Resume",
  },
  {
    id: "invoice-extractor",
    title: "Multi-Language Invoice Extractor",
    tag: "Local app",
    tech: "Python, Tesseract, EasyOCR, spaCy, Whoosh, FastAPI, Streamlit",
    status: "Local application",
    card:
      "Local pipeline that turns invoice images and PDFs into structured fields, then validates, searches, and exports them.",
    stack: ["Python", "Tesseract", "spaCy", "FastAPI"],
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
    card:
      "Local prototype that drafts specialist-oriented readings of a medical report and searches a FAISS index when one is available.",
    stack: ["FastAPI", "React", "Sentence Transformers", "FAISS"],
    image: "/projects/pharma.jpg",
    imageAlt:
      "Pharma Copilot screen showing a pasted medical report beside cardiologist and psychologist results.",
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
    card: "Mobile ordering app that turns a dining-assistant conversation into structured cart updates.",
    stack: ["React Native", "Expo", "Express", "OpenAI"],
    summary:
      "Mobile ordering app that turns a conversation with a dining assistant into structured cart updates.",
    detail:
      "Built for the Viridien AI Full-Stack Engineering Internship challenge. The Expo client browses a menu and keeps a live order ticket. The Express API requests JSON cart actions from OpenAI, validates them with Zod, and falls back to a local parser when the key is missing or the model response fails.",
    image: "/projects/velora.jpg",
    imageAlt:
      "Velora Bistro menu with Spicy Chicken Sandwich at $18 and Truffle Wagyu Burger at $34, each with an Add to Table button.",
    walkthrough: "https://www.loom.com/share/748745cb18b141979c42612422ca5155",
    code: "https://github.com/RajK158/Intelligent-Bistro",
  },
];

export const linkedinCertificationsUrl =
  "https://www.linkedin.com/in/rajkundur/details/certifications/";

export const certifications = [
  {
    title: "CS50's Introduction to Artificial Intelligence with Python",
    issuer: "Harvard University",
    issued: "Nov 2026",
    logo: "/credentials/cs50.png",
    href: linkedinCertificationsUrl,
    linkLabel: "LinkedIn",
  },
  {
    title: "Certificate of completion: Claude code 101",
    issuer: "Anthropic",
    issued: "Nov 2026",
    credentialId: "uc68sw5kyteo",
    logo: "/credentials/anthropic.png",
    href: "https://verify.skilljar.com/c/uc68sw5kyteo",
    linkLabel: "Verify",
  },
  {
    title: "Google Cloud Program 2021",
    issuer: "Google Developer Experts",
    issued: "Sep 2021",
    expired: "Oct 2021",
    logo: "/credentials/gde.svg",
    href: linkedinCertificationsUrl,
    linkLabel: "LinkedIn",
  },
];

export const publications = [
  {
    title: "Exposing the Security Vulnerabilities of Generative AI: A Comprehensive Survey",
    issuer: "IEEE",
    issued: "Sep 2025",
    credentialId: "11255987",
    authors: "David DeGirolamo, Anuja A. Sawant, Raj Kundur, Michele Collander, and Muhammad Abdul Basit Ur Rahim",
    logo: "/credentials/ieee.svg",
    href: "https://doi.org/10.1109/intcec65580.2025.11255987",
    linkLabel: "DOI",
  },
  {
    title: "Detecting Spammers on Social Media Using Machine Learning Methodologies",
    issuer: "International Journal of Research and Analytical Reviews (IJRAR)",
    issued: "Feb 2023",
    venue: "Vol. 10, Issue 1, February 2023",
    authors: "Ashwini G. Kamble, Prajakta Kudale, Raj Kundur, and Dipti Shinde",
    href: "https://ijrar.org/papers/IJRAR23A1860.pdf",
    linkLabel: "PDF",
  },
];

export const experience = [
  {
    title: "Graduate Software Engineer",
    company: "California State University, Long Beach",
    period: "Jan 2025 – Present",
    points: [
      "Secured financial APIs with JWT authentication and FastAPI dependency-injected RBAC, restricting access by user role across 1K+ daily requests.",
      "Optimized MongoDB aggregation pipelines for payment data retrieval, cutting query volume and retrieval time by 20%.",
      "Diagnosed production service failures by analyzing AWS CloudWatch Logs, shortening issue resolution time by 60%.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Cloudtool (Zoho Partner), India",
    period: "Sep 2022 – Nov 2024",
    points: [
      "Designed a Node.js bulk-import microservice to ingest CSV files from Azure Blob Storage, loading 7K+ customer records into PostgreSQL and reducing manual data entry by 50%.",
      "Developed Kafka producers and consumers to queue CRM follow-up notifications for background processing, lowering API response latency by 30%.",
      "Implemented Redis caching and rate limiting for Express.js invoice APIs, resulting in 15% fewer database queries and controlling traffic spikes.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "Q-Spiders, India",
    period: "Feb 2022 – Aug 2022",
    points: [
      "Refactored Java/Spring Boot REST APIs for enrollment workflows, eliminating redundant validation across 6 modules.",
      "Streamlined payment transaction logging in Oracle by refining database schemas and CRUD operations, and optimized PL/SQL stored procedures to support 60K+ records per week.",
      "Improved infrastructure reliability by 8% through Prometheus metrics collection and Grafana dashboards for service monitoring and automated alerts.",
    ],
  },
];

export const education = [
  {
    degree: "Master of Science in Computer Science",
    school: "California State University, Long Beach",
    period: "Jan 2025 – Dec 2026",
    note: "GPA 3.8. Coursework includes advanced software engineering, algorithms, and artificial intelligence.",
  },
  {
    degree: "Bachelor of Technology in Computer Engineering",
    school: "Pune University, India",
    period: "Jul 2020 – May 2023",
  },
];

export const achievements = [
  {
    title: "Graduate Scholarship",
    detail: "Awarded a 60% scholarship at CSULB, selected from a pool of 2,800 students.",
  },
  {
    title: "IBM Hackathon",
    detail: "Secured second place at an IBM Hackathon in Los Angeles.",
  },
  {
    title: "INCTEC Conference 2025",
    detail: "Presented research at the INCTEC Conference 2025 in Chicago.",
  },
];
