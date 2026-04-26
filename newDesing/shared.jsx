// Shared tokens, strings, and tiny components for both landing directions.

const TOKENS = {
  // Warm paper palette
  paper: '#F1EAD6',        // main cream
  paperDeep: '#E6DBB8',    // slightly darker band
  paperLight: '#FAF5E6',   // lightest card
  ink: '#1E1A12',          // deep ink
  ink2: '#3A3326',         // body
  ink3: '#6B5F45',         // muted
  rule: '#CFC2A3',         // hairline
  // Dome olive — pulled from the actual Many character
  manyBody: '#E1E7C1',     // soft ghost body color
  sage: '#C7D38A',         // brighter highlight
  sageDeep: '#5E6A34',     // the actual Dome olive outline
  sageDark: '#373F1E',     // deep study-room green
  // Accent — warm rust for variety / annotations
  rust: '#B6572A',
  rustDeep: '#8A3E1A',
};

const STRINGS = {
  en: {
    nav: { features: 'Features', how: 'How it works', agents: 'Agents', docs: 'Docs', github: 'GitHub' },
    download: 'Download',
    forMac: 'for macOS',
    forWin: 'for Windows',
    // A — mascot forward
    a: {
      eyebrow: 'v2.1.4 — Many Voice · Calendar · Marketplace',
      h1a: 'Your knowledge,',
      h1b: 'under one dome.',
      sub: 'The quiet desktop workspace for researchers and students. Drop in your PDFs, slides, notes and audio. Let Many — your studious little ghost — read everything, connect it, and hand it back when you need it.',
      primary: 'Download for Mac',
      secondary: 'Windows · Linux',
      tinyNote: 'Free. Open source. Runs on your machine.',
      pill: 'Meet Many',
      manyCardTitle: 'Many has read every page of every PDF, slide and note in your library.',
      manyCardBody: 'Ask anything in plain language. Many searches, reasons over structured pages, and cites the exact source. No embeddings. No cloud. Just reasoning over your shelves.',
      marquee: ['PDFs', 'Notes', 'Slides', 'Audio + transcripts', 'YouTube', 'Google Drive', 'Web articles', 'Mindmaps', 'Flashcards', 'Citations', 'MCP servers', 'Calendar'],
    },
    // B — editorial no-mascot
    b: {
      eyebrow: 'Dome — v2.1.4',
      h1: 'A quiet place for your thinking.',
      sub: 'Dome is a desktop workspace for researchers and students. It gathers every document, link and recording you read, indexes them with reason, and hands them back when you need them.',
      primary: 'Download',
      tinyNote: 'Available for macOS and Windows · Free, open source',
      sectionLabel1: 'The problem',
      problemH: 'Your research is everywhere. Your thinking, nowhere.',
      problemP: 'Twelve tabs. Three drives. A notebook. A voice memo from Tuesday. Every project starts as a search through folders you half-remember naming.',
      sectionLabel2: 'The idea',
      ideaH: 'One dome. Reasoned, not retrieved.',
      ideaP: 'Import once. Dome converts, indexes and cross-links with a reasoning engine called PageIndex — so Many can answer with the page number, not a vibe.',
    },
    // Shared
    featuresLabel: 'What\'s inside',
    featuresH: 'Everything you collect, finally in conversation with itself.',
    features: [
      { k: '01', t: 'Many — your assistant', p: 'A LangGraph agent with memory, tools, and your full library on hand. Ask it to summarise, compare, or draft — it answers with citations to the page.' },
      { k: '02', t: 'PageIndex reasoning', p: 'Documents parse into structured nodes and Many reasons over them — no embeddings, no hallucinated retrieval.' },
      { k: '03', t: 'Studio outputs', p: 'Turn sources into mindmaps, quizzes, flashcards (SM-2), timelines, FAQs, study guides. Always cited.' },
      { k: '04', t: 'Agents, Workflows, Runs', p: 'Build your own agents. Chain them into workflows. See every tool call in a readable run log.' },
      { k: '05', t: 'Notion-style editor', p: 'Tiptap-based: callouts, tables, columns, slash commands. Embed PDF pages inline. Tag a note [linkedin] and a workflow fires.' },
      { k: '06', t: 'Bring your own model', p: 'OpenAI, Anthropic, Google, Ollama, Venice, MiniMax. Run everything local if you prefer — Dome doesn\'t mind.' },
    ],
    flowLabel: 'The flow',
    flowH: 'From a pile of PDFs to a mind of your own.',
    flow: [
      { n: '01', t: 'Drop it in', p: 'Drag files, paste URLs, connect Drive, WhatsApp, Calendar.' },
      { n: '02', t: 'Docling + PageIndex', p: 'Dome converts and indexes in the background.' },
      { n: '03', t: 'Talk to Many', p: 'Ask, search, summarise, cite, remember.' },
      { n: '04', t: 'Make it yours', p: 'Notes, flashcards, timelines, agents, exports.' },
    ],
    stackLabel: 'Under the hood',
    stackH: 'Built like a tool you\'d trust with a dissertation.',
    stack: [
      'Electron + Vite + React 18',
      'LangGraph agents',
      'PageIndex reasoning',
      'SQLite · local first',
      'MCP servers · stdio + http',
      'Playwright scraping',
      'Bring-your-own model',
      'EN · ES · FR · PT',
    ],
    useLabel: 'Made for',
    useH: 'Whatever your shelf looks like.',
    uses: [
      { t: 'Graduate researchers', p: 'Track sources, annotate papers, draft chapters with citations intact.' },
      { t: 'University students', p: 'Turn a semester of slides into flashcards, mindmaps and a study plan.' },
      { t: 'Independent scholars', p: 'A private library that reads itself. No cloud gatekeepers.' },
      { t: 'Knowledge workers', p: 'Stand up a team of agents over your own corpus of documents.' },
    ],
    marketLabel: 'Marketplace',
    marketH: 'Install agents like you install apps.',
    marketP: '37 agents ready to install — from Research Pro to Zettelkasten Builder — or build your own.',
    agentsSample: [
      { n: 'Research Pro', d: 'Deep research with web search and academic synthesis.' },
      { n: 'Writing Coach', d: 'Edits, rewrites, and sharpens your drafts.' },
      { n: 'Study Buddy', d: 'Flashcards, quizzes and summaries from your sources.' },
      { n: 'PDF Deep Reader', d: 'Structural analysis, key ideas, arguments, notes.' },
      { n: 'Code Helper', d: 'Analyse, debug and generate code in multiple languages.' },
      { n: 'Graph Architect', d: 'Build knowledge graphs that connect your library.' },
    ],
    finalH: 'Put it all under the dome.',
    finalP: 'Install Dome and stop losing the thought you had on Thursday.',
    footer: {
      tag: 'Dome is free and open source. Built by a researcher, for researchers.',
      cols: [
        { h: 'Product', links: ['Features', 'Download', 'Marketplace', 'Changelog'] },
        { h: 'Learn', links: ['Docs', 'Guides', 'Ollama setup', 'MCP servers'] },
        { h: 'Project', links: ['GitHub', 'License', 'Contribute', 'Contact'] },
      ],
    },
  },
  es: {
    nav: { features: 'Funciones', how: 'Cómo funciona', agents: 'Agentes', docs: 'Docs', github: 'GitHub' },
    download: 'Descargar',
    forMac: 'para macOS',
    forWin: 'para Windows',
    a: {
      eyebrow: 'v2.1.4 — Many Voz · Calendario · Marketplace',
      h1a: 'Tu conocimiento,',
      h1b: 'bajo una sola cúpula.',
      sub: 'El espacio de escritorio tranquilo para quien investiga y estudia. Arrastra tus PDFs, diapositivas, notas y audio. Deja que Many — tu fantasma estudioso — lo lea todo, lo conecte y te lo devuelva cuando lo necesites.',
      primary: 'Descargar para Mac',
      secondary: 'Windows · Linux',
      tinyNote: 'Gratis. Código abierto. Corre en tu máquina.',
      pill: 'Conoce a Many',
      manyCardTitle: 'Many ha leído cada página de cada PDF, diapositiva y nota de tu biblioteca.',
      manyCardBody: 'Pregúntale en lenguaje natural. Many busca, razona sobre páginas estructuradas y cita la fuente exacta. Sin embeddings. Sin nube. Razonamiento sobre tus estantes.',
      marquee: ['PDFs', 'Notas', 'Diapositivas', 'Audio + transcripciones', 'YouTube', 'Google Drive', 'Artículos web', 'Mapas mentales', 'Flashcards', 'Citas', 'Servidores MCP', 'Calendario'],
    },
    b: {
      eyebrow: 'Dome — v2.1.4',
      h1: 'Un lugar tranquilo para tu pensamiento.',
      sub: 'Dome es un espacio de escritorio para investigadores y estudiantes. Reúne cada documento, enlace y grabación que lees, los indexa con razonamiento y te los devuelve cuando los necesitas.',
      primary: 'Descargar',
      tinyNote: 'Disponible para macOS y Windows · Gratis, código abierto',
      sectionLabel1: 'El problema',
      problemH: 'Tu investigación está en todas partes. Tu pensamiento, en ninguna.',
      problemP: 'Doce pestañas. Tres discos. Un cuaderno. Un audio del martes. Cada proyecto empieza buscando en carpetas que medio recuerdas haber nombrado.',
      sectionLabel2: 'La idea',
      ideaH: 'Una cúpula. Razonada, no recuperada.',
      ideaP: 'Importa una vez. Dome convierte, indexa y enlaza con un motor de razonamiento llamado PageIndex — Many responde con el número de página, no con una intuición.',
    },
    featuresLabel: 'Qué hay dentro',
    featuresH: 'Todo lo que recoges, por fin conversando entre sí.',
    features: [
      { k: '01', t: 'Many — tu asistente', p: 'Un agente LangGraph con memoria, herramientas y tu biblioteca entera a mano. Pídele resumir, comparar o redactar — responde con citas a la página.' },
      { k: '02', t: 'Razonamiento PageIndex', p: 'Los documentos se convierten en nodos estructurados y Many razona sobre ellos — sin embeddings, sin recuperación alucinada.' },
      { k: '03', t: 'Salidas de Studio', p: 'Convierte fuentes en mapas mentales, quizzes, flashcards (SM-2), líneas de tiempo, FAQs, guías. Siempre citadas.' },
      { k: '04', t: 'Agentes, Workflows, Runs', p: 'Crea tus propios agentes. Encadénalos en workflows. Lee cada llamada de herramienta en un log legible.' },
      { k: '05', t: 'Editor tipo Notion', p: 'Basado en Tiptap: callouts, tablas, columnas, comandos con slash. Embeds de páginas de PDF. Etiqueta una nota [linkedin] y un workflow se dispara.' },
      { k: '06', t: 'Trae tu propio modelo', p: 'OpenAI, Anthropic, Google, Ollama, Venice, MiniMax. Todo local si prefieres — a Dome le da igual.' },
    ],
    flowLabel: 'El flujo',
    flowH: 'De un montón de PDFs a una mente propia.',
    flow: [
      { n: '01', t: 'Súbelo', p: 'Arrastra archivos, pega URLs, conecta Drive, WhatsApp, Calendario.' },
      { n: '02', t: 'Docling + PageIndex', p: 'Dome convierte e indexa en segundo plano.' },
      { n: '03', t: 'Habla con Many', p: 'Pregunta, busca, resume, cita, recuerda.' },
      { n: '04', t: 'Hazlo tuyo', p: 'Notas, flashcards, timelines, agentes, exports.' },
    ],
    stackLabel: 'Bajo el capó',
    stackH: 'Construido como una herramienta en la que confiarías una tesis.',
    stack: [
      'Electron + Vite + React 18',
      'Agentes LangGraph',
      'PageIndex — razonamiento',
      'SQLite · local primero',
      'MCP · stdio + http',
      'Scraping con Playwright',
      'Trae tu propio modelo',
      'EN · ES · FR · PT',
    ],
    useLabel: 'Hecho para',
    useH: 'Sea cual sea tu estantería.',
    uses: [
      { t: 'Investigación de posgrado', p: 'Rastrea fuentes, anota papers, redacta capítulos con citas intactas.' },
      { t: 'Estudiantes universitarios', p: 'Convierte un semestre de diapositivas en flashcards, mapas mentales y plan de estudio.' },
      { t: 'Académicos independientes', p: 'Una biblioteca privada que se lee sola. Sin porteros en la nube.' },
      { t: 'Trabajadores del conocimiento', p: 'Despliega un equipo de agentes sobre tu propio corpus de documentos.' },
    ],
    marketLabel: 'Marketplace',
    marketH: 'Instala agentes como instalas apps.',
    marketP: '37 agentes listos para instalar — desde Research Pro hasta Zettelkasten Builder — o construye el tuyo.',
    agentsSample: [
      { n: 'Research Pro', d: 'Investigación profunda con búsqueda web y síntesis académica.' },
      { n: 'Writing Coach', d: 'Edita, reescribe y afina tus borradores.' },
      { n: 'Study Buddy', d: 'Flashcards, quizzes y resúmenes desde tus fuentes.' },
      { n: 'PDF Deep Reader', d: 'Análisis estructural, ideas clave, argumentos, notas.' },
      { n: 'Code Helper', d: 'Analiza, depura y genera código en varios lenguajes.' },
      { n: 'Graph Architect', d: 'Construye grafos de conocimiento que conectan tu biblioteca.' },
    ],
    finalH: 'Ponlo todo bajo la cúpula.',
    finalP: 'Instala Dome y deja de perder la idea que tuviste el jueves.',
    footer: {
      tag: 'Dome es gratis y de código abierto. Hecho por un investigador, para investigadores.',
      cols: [
        { h: 'Producto', links: ['Funciones', 'Descargar', 'Marketplace', 'Changelog'] },
        { h: 'Aprende', links: ['Docs', 'Guías', 'Ollama setup', 'Servidores MCP'] },
        { h: 'Proyecto', links: ['GitHub', 'Licencia', 'Contribuir', 'Contacto'] },
      ],
    },
  },
};

// ─── tiny primitives ────────────────────────────────────────
// Paper grain background (svg noise)
const paperGrainURL = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.12  0 0 0 0 0.10  0 0 0 0 0.07  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

// Real Many character. moods: 'default' | 'think' | 'wave' | 'glasses' | 'walk'
function Many({ size = 120, mood = 'default', style = {} }) {
  const src = {
    default: 'assets/many-wave.png',   // plain-faced but friendly
    think:   'assets/many-think.png',  // lightbulb — for features/flow
    wave:    'assets/many-wave.png',   // greeting, smiling
    glasses: 'assets/many-glasses.png',// scholar
    walk:    'assets/many-walk.png',   // stoic, plain body
  }[mood] || 'assets/many-wave.png';
  return (
    <img src={src} width={size} height={size} alt="Many"
      style={{ display: 'block', objectFit: 'contain', imageRendering: 'auto', ...style }}/>
  );
}

// Small decorative star/sparkle
function Spark({ size = 14, color = TOKENS.sageDeep, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={style}>
      <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z" fill={color}/>
    </svg>
  );
}

// Hairline rule
function Rule({ color = TOKENS.rule, style = {} }) {
  return <div style={{ height: 1, background: color, width: '100%', ...style }} />;
}

// Small-caps label
function Eyebrow({ children, color = TOKENS.ink3, style = {} }) {
  return (
    <div style={{
      fontSize: 11, fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      letterSpacing: 2, textTransform: 'uppercase', color, fontWeight: 500,
      ...style,
    }}>{children}</div>
  );
}

// Stamp-style badge
function Stamp({ children, color = TOKENS.rust, rotate = -6 }) {
  return (
    <div style={{
      display: 'inline-block',
      border: `1.5px dashed ${color}`,
      color, padding: '6px 12px',
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
      transform: `rotate(${rotate}deg)`,
      borderRadius: 2,
    }}>{children}</div>
  );
}

// macOS window chrome for product mocks
function WindowChrome({ children, title = 'Dome', width = '100%', height = 'auto', style = {} }) {
  return (
    <div style={{
      width, height, background: '#fff',
      borderRadius: 10,
      boxShadow: '0 2px 0 rgba(0,0,0,0.04), 0 20px 48px rgba(48,38,20,0.18), 0 60px 120px rgba(48,38,20,0.12)',
      border: `1px solid ${TOKENS.rule}`,
      overflow: 'hidden',
      ...style,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 14px',
        background: TOKENS.paper,
        borderBottom: `1px solid ${TOKENS.rule}`,
      }}>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: '#E5756A', border: '1px solid rgba(0,0,0,0.08)' }}/>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: '#EBB447', border: '1px solid rgba(0,0,0,0.08)' }}/>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: '#6AC47F', border: '1px solid rgba(0,0,0,0.08)' }}/>
        <div style={{ marginLeft: 12, fontSize: 11, color: TOKENS.ink3, fontFamily: '"JetBrains Mono", monospace', letterSpacing: 1 }}>{title}</div>
      </div>
      {children}
    </div>
  );
}

// Dome wordmark — ghost mark + wordmark
function DomeMark({ size = 22, color = TOKENS.ink }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <img src="assets/many-wave.png" width={size + 6} height={size + 6} alt="" style={{ display: 'block' }}/>
      <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: size + 6, letterSpacing: -0.5, color, fontWeight: 400, lineHeight: 1 }}>
        Dome
      </div>
    </div>
  );
}

// A real product screenshot framed in macOS chrome — used for hero product shot
function Screen({ src, title = 'Dome', style = {}, height, width = '100%' }) {
  return (
    <div style={{
      width, background: '#fff',
      borderRadius: 12,
      boxShadow: '0 2px 0 rgba(0,0,0,0.04), 0 24px 64px rgba(48,38,20,0.22), 0 80px 140px rgba(48,38,20,0.15)',
      border: `1px solid ${TOKENS.rule}`,
      overflow: 'hidden', ...style,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 14px',
        background: TOKENS.paperLight,
        borderBottom: `1px solid ${TOKENS.rule}`,
      }}>
        <span style={{ width: 11, height: 11, borderRadius: 999, background: '#E5756A' }}/>
        <span style={{ width: 11, height: 11, borderRadius: 999, background: '#EBB447' }}/>
        <span style={{ width: 11, height: 11, borderRadius: 999, background: '#6AC47F' }}/>
        <div style={{ marginLeft: 14, fontSize: 11, color: TOKENS.ink3, fontFamily: '"JetBrains Mono", monospace', letterSpacing: 1 }}>{title}</div>
      </div>
      <img src={src} alt="" style={{ display: 'block', width: '100%', height: height || 'auto' }}/>
    </div>
  );
}

Object.assign(window, { TOKENS, STRINGS, paperGrainURL, Many, Spark, Rule, Eyebrow, Stamp, WindowChrome, DomeMark, Screen });
