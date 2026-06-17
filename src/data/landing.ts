// Fuente única de contenido de la landing. Cambiar producto = editar aquí; los
// componentes solo consumen estos datos (mantenible y flexible).

export const links = {
  releases: "https://github.com/maxprain12/dome/releases",
  github: "https://github.com/maxprain12/dome",
  docs: "https://github.com/maxprain12/dome#readme",
};

export interface NavLink {
  label: string;
  href: string;
}

export const nav = {
  brand: "Dome",
  logo: "/assets/wave.svg",
  links: [
    { label: "Benefits", href: "#benefits" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ] as NavLink[],
  cta: { label: "↓ Download", href: links.releases } as NavLink,
};

export const hero = {
  eyebrow: "Open source · Local-first · AI-powered",
  title: "Your knowledge,",
  titleAccent: "under one dome.",
  subtitle:
    "Collect your notes, PDFs, videos, and links in one place — then let Many, your AI agent, search, explain, and connect everything. Local or cloud, your call.",
  primaryCta: { label: "↓ Download free", href: links.releases } as NavLink,
  secondaryCta: { label: "★ Star on GitHub", href: links.github } as NavLink,
  proof: ["Free & open source", "macOS · Windows · Linux", "Works offline"],
  mascot: "/assets/wave.svg",
};

// Demo interactiva de Many en el hero (preguntas preestablecidas + respuesta guionizada).
export interface DemoQA {
  q: string;
  a: string;
}
export const manyDemo = {
  greeting: "Hi, I'm Many. Ask me about your library →",
  questions: [
    { q: "Summarise this PDF", a: "Done — 12 pages, 3 key claims, each cited. Want the bullet version?" },
    { q: "What connects my notes?", a: "Your Biology and Chemistry notes both cover enzyme kinetics — I linked them." },
    { q: "Quiz me", a: "Q1: What's the rate-limiting step of the Krebs cycle? I'll grade your answer." },
  ] as DemoQA[],
};

export interface ProofItem {
  value: string;
  label: string;
}

export const socialProof: ProofItem[] = [
  { value: "100%", label: "Open source" },
  { value: "10", label: "AI providers" },
  { value: "3", label: "Platforms" },
  { value: "Local-first", label: "Your data stays yours" },
];

export interface Benefit {
  title: string;
  text: string;
  accent: string; // CSS var name for the pastel tile
  img?: string;
}

export const benefits: Benefit[] = [
  {
    title: "Everything in one place",
    text: "Notes, PDFs, videos, web pages, and audio — organised into projects you can actually find again.",
    accent: "var(--c-mint)",
    img: "/assets/many-1.png",
  },
  {
    title: "Ask, don't dig",
    text: "Many searches your whole library and answers in plain language, citing your own sources.",
    accent: "var(--c-cyan)",
    img: "/assets/many-3.png",
  },
  {
    title: "Learn it, don't just store it",
    text: "Turn any source into flashcards, quizzes, and study guides with spaced repetition.",
    accent: "var(--c-lavender)",
    img: "/assets/many-7.png",
  },
  {
    title: "Private by default",
    text: "Run fully offline with Ollama, or bring your own cloud keys. Your library never leaves your machine unless you choose.",
    accent: "var(--c-olive)",
    img: "/assets/many.png",
  },
];

export interface Step {
  n: string;
  title: string;
  text: string;
}

export const steps: Step[] = [
  { n: "01", title: "Add your sources", text: "Drop in notes, PDFs, videos, and links." },
  { n: "02", title: "Ask Many", text: "Search and chat with your library in plain language." },
  { n: "03", title: "Learn & export", text: "Flashcards, study guides, and cited answers." },
];

export interface Testimonial {
  quote: string;
  role: string;
  accent: string;
}

// Testimonios ilustrativos por perfil (placeholder, sin personas reales).
export const testimonials: Testimonial[] = [
  {
    quote: "Dome replaced three apps in my research workflow. Everything's finally in one place.",
    role: "PhD researcher",
    accent: "var(--c-mint)",
  },
  {
    quote: "I ask Many to summarise a paper and it cites the exact page. A lifesaver before exams.",
    role: "Computer Science student",
    accent: "var(--c-cyan)",
  },
  {
    quote: "Local-first means my notes stay mine. That's why I switched.",
    role: "Independent writer",
    accent: "var(--c-lavender)",
  },
];

export const testimonialsNote = "Illustrative — your story could be here.";

export interface Faq {
  q: string;
  a: string;
}

export const faq: Faq[] = [
  {
    q: "Is Dome free?",
    a: "Yes — Dome is open source and free for personal and educational use. Commercial use needs written permission (see the license in the repo).",
  },
  {
    q: "Does my data stay private?",
    a: "Yes. Dome is local-first: your library lives on your machine. Run fully offline with Ollama, or add your own cloud API keys — your choice.",
  },
  {
    q: "Which AI providers can I use?",
    a: "OpenAI, Anthropic, Google, Ollama, OpenRouter, DeepSeek, Moonshot, Qwen, GitHub Copilot, and MiniMax.",
  },
  {
    q: "What can I import?",
    a: "Notes, PDFs, web pages, YouTube videos, audio, and images — all organised into projects.",
  },
  {
    q: "Which platforms are supported?",
    a: "macOS, Windows, and Linux.",
  },
];

export const finalCta = {
  title: "Put it all under the dome.",
  subtitle: "Free, open source, and yours. Download Dome for macOS, Windows, or Linux.",
  primary: { label: "↓ Download Dome", href: links.releases } as NavLink,
  secondary: { label: "View on GitHub", href: links.github } as NavLink,
  mascot: "/assets/wave.svg",
};
