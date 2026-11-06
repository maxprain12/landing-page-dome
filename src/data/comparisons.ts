import type { Locale } from "../i18n";

export type Comparison = {
  slug: string;
  name: string;
  mark: string;
  icon?: string;
  tone: string;
  source: { label: string; url: string }[];
  locales: Record<Locale, {
    category: string;
    teaser: string;
    answer: string;
    domeFor: string[];
    rivalFor: string[];
    rows: { topic: string; dome: string; rival: string }[];
    questions: { q: string; a: string }[];
  }>;
};

/** Product claims checked against Dome's feature catalog and manuals. Competitor claims link to first-party pages. */
export const comparisons: Comparison[] = [
  {
    slug: "notion", name: "Notion", mark: "N", icon: "/brands/notion.svg", tone: "notion",
    source: [
      { label: "Notion Projects", url: "https://www.notion.com/product/projects" },
      { label: "Funciones de Dome", url: "https://dome.dowi.es/funciones" },
    ],
    locales: {
      es: {
        category: "Documentos y proyectos", teaser: "Páginas, bases de datos, tareas e IA en un workspace compartido.",
        answer: "Notion organiza documentación y proyectos para equipos con bases de datos, vistas y Notion AI. Dome reúne archivos y notas de un proyecto en una biblioteca local y permite a Many trabajar con esos recursos y con herramientas autorizadas.",
        domeFor: ["Quieres conservar archivos y notas Markdown en una bóveda local.", "Necesitas conversar con documentos del proyecto y revisar las referencias.", "Quieres configurar proveedor, modelo y permisos de Many."],
        rivalFor: ["Tu equipo depende de páginas y bases de datos compartidas en la web.", "Necesitas vistas de tareas, dependencias y sprints integrados.", "Quieres editar documentación de forma colaborativa en Notion."],
        rows: [
          { topic: "Centro del trabajo", dome: "Proyectos con archivos, notas y personas en la app de escritorio.", rival: "Páginas, wikis y bases de datos compartidas." },
          { topic: "IA", dome: "Many pregunta por recursos, muestra referencias y usa herramientas según la configuración.", rival: "Notion AI redacta documentos y ayuda a trabajar con el contenido y los proyectos." },
          { topic: "Tareas", dome: "Agentes, workflows y automatizaciones configurables; no equivale a las bases de datos de tareas de Notion.", rival: "Tareas, subtareas, responsables, fechas, dependencias, vistas y sprints." },
          { topic: "Archivos", dome: "La biblioteca y las notas Markdown viven en el ordenador; la sincronización es un servicio aparte.", rival: "El trabajo se organiza dentro del workspace de Notion." },
        ],
        questions: [{ q: "¿Dome sustituye a Notion para un equipo?", a: "Depende del trabajo. Dome encaja si el centro son archivos locales y acciones de Many. Notion ofrece una estructura de colaboración y seguimiento de tareas más madura." }],
      },
      en: {
        category: "Docs and projects", teaser: "Pages, databases, tasks and AI in a shared workspace.",
        answer: "Notion organizes team docs and projects with databases, views and Notion AI. Dome keeps project files and notes in a local library and lets Many work with those resources and authorized tools.",
        domeFor: ["You want files and Markdown notes in a local vault.", "You need to ask about project documents and inspect references.", "You want to choose Many's provider, model and permissions."],
        rivalFor: ["Your team relies on shared web pages and databases.", "You need built-in task views, dependencies and sprints.", "You want collaborative editing inside Notion."],
        rows: [
          { topic: "Work hub", dome: "Projects with files, notes and people in a desktop app.", rival: "Shared pages, wikis and databases." },
          { topic: "AI", dome: "Many works with resources, shows references and uses configured tools.", rival: "Notion AI drafts docs and works with workspace and project content." },
          { topic: "Tasks", dome: "Configurable agents, workflows and automations; not a substitute for Notion's task databases.", rival: "Tasks, owners, dates, dependencies, views and sprints." },
          { topic: "Files", dome: "The library and Markdown notes live on your computer; sync is separate.", rival: "Work is organized in the Notion workspace." },
        ],
        questions: [{ q: "Can Dome replace Notion for a team?", a: "It depends on the work. Dome fits local files and Many actions; Notion has a more mature shared task and collaboration structure." }],
      },
    },
  },
  {
    slug: "google-workspace", name: "Google Workspace", mark: "G", tone: "google",
    source: [
      { label: "Gemini en Google Workspace", url: "https://workspace.google.com/blog/product-announcements/less-switching-more-flow-5-new-agentic-capabilities-across-google-workspace-apps" },
      { label: "Biblioteca de Dome", url: "https://dome.dowi.es/funciones/library" },
    ],
    locales: {
      es: {
        category: "Documentos y presentaciones", teaser: "Docs, Drive, Slides y Gemini conectados entre sí.",
        answer: "Google Workspace combina edición colaborativa en Docs y Slides, archivos en Drive y Gemini entre aplicaciones. Dome se centra en una biblioteca de escritorio por proyectos: Many utiliza tus recursos y Estudio prepara resultados para revisarlos según el proveedor configurado.",
        domeFor: ["Trabajas con una biblioteca de archivos local organizada por proyecto.", "Quieres preguntar por tus propios documentos con referencias.", "Prefieres elegir el proveedor de IA y revisar acciones antes de ejecutarlas."],
        rivalFor: ["Necesitas coeditar Docs y Slides en tiempo real.", "Tu equipo ya organiza el trabajo en Drive, Gmail y Calendar.", "Quieres crear y compartir presentaciones dentro de la suite de Google."],
        rows: [
          { topic: "Documentos", dome: "Notas Markdown y archivos del proyecto en la biblioteca local.", rival: "Docs y Drive con colaboración y permisos de Workspace." },
          { topic: "Presentaciones", dome: "Estudio prepara contenido generado según proveedor y herramienta; revisa el formato disponible antes de exportar.", rival: "Gemini puede crear Slides con contexto de Workspace." },
          { topic: "IA y fuentes", dome: "Many puede responder sobre recursos y mostrar referencias si la búsqueda está configurada.", rival: "Gemini puede usar archivos, correo y conversaciones de Workspace según el acceso configurado." },
          { topic: "Trabajo compartido", dome: "App de escritorio con sync opcional según el servicio.", rival: "Suite web diseñada para colaboración y compartición en la nube." },
        ],
        questions: [{ q: "¿Dome abre Google Docs como editor colaborativo?", a: "La propuesta documentada de Dome es su biblioteca, notas y Many. Para coedición nativa de Docs y Slides, Google Workspace sigue siendo la opción específica." }],
      },
      en: {
        category: "Docs and presentations", teaser: "Docs, Drive, Slides and Gemini working together.",
        answer: "Google Workspace combines collaborative Docs and Slides, Drive files and cross-app Gemini. Dome centers on a project-based desktop library: Many uses your resources and Studio prepares results for review with the configured provider.",
        domeFor: ["You organize local files by project.", "You want answers grounded in your documents with references.", "You prefer choosing the AI provider and reviewing actions."],
        rivalFor: ["You need live Docs and Slides co-editing.", "Your team lives in Drive, Gmail and Calendar.", "You create and share decks in Google's suite."],
        rows: [
          { topic: "Documents", dome: "Markdown notes and project files in a local library.", rival: "Docs and Drive with Workspace collaboration and permissions." },
          { topic: "Presentations", dome: "Studio prepares generated content depending on provider and tool; check export formats.", rival: "Gemini can create Slides from Workspace context." },
          { topic: "AI and sources", dome: "Many can answer about resources and show references when search is configured.", rival: "Gemini can use Workspace files, mail and chat according to access." },
          { topic: "Sharing", dome: "Desktop app with optional sync by service.", rival: "Web suite designed for cloud collaboration." },
        ],
        questions: [{ q: "Does Dome edit Google Docs collaboratively?", a: "Dome documents its library, notes and Many. Google Workspace is the dedicated option for native Docs and Slides co-editing." }],
      },
    },
  },
  {
    slug: "microsoft-365-copilot", name: "Microsoft 365 Copilot", mark: "▦", tone: "microsoft",
    source: [
      { label: "Microsoft 365 Copilot", url: "https://support.microsoft.com/en-us/microsoft-365-copilot/copilot-in-microsoft-365-personal-family-and-premium" },
      { label: "Capacidades de Copilot por aplicación", url: "https://learn.microsoft.com/en-us/copilot/microsoft-365/which-copilot-for-your-organization" },
    ],
    locales: {
      es: {
        category: "Ofimática con IA", teaser: "Word, PowerPoint, Outlook y Copilot en la suite Microsoft.",
        answer: "Microsoft 365 Copilot ayuda a redactar en Word, crear presentaciones en PowerPoint y trabajar con Outlook y otras apps. Dome une archivos locales, notas, personas y Many en un workspace de escritorio con proveedor de IA configurable.",
        domeFor: ["Tus fuentes están en archivos y proyectos locales.", "Quieres que Many trabaje con recursos y herramientas elegidos por ti.", "Necesitas revisar referencias y permisos de cada acción."],
        rivalFor: ["La entrega exige Word, Excel y PowerPoint nativos.", "Tu organización trabaja en Outlook, Teams y OneDrive.", "Quieres las capacidades de Copilot dentro de esas aplicaciones."],
        rows: [
          { topic: "Documentos", dome: "Notas Markdown y archivos en la biblioteca del proyecto.", rival: "Word y OneNote con asistencia de Copilot." },
          { topic: "Presentaciones", dome: "Estudio genera contenido compatible con el proveedor configurado; el formato depende de la herramienta.", rival: "Copilot crea y edita presentaciones en PowerPoint." },
          { topic: "Contexto", dome: "Many trabaja con recursos aportados y herramientas autorizadas.", rival: "Copilot trabaja en el contexto de Microsoft 365 según plan y permisos." },
          { topic: "Colaboración", dome: "Flujo centrado en la app de escritorio y la biblioteca local.", rival: "Coedición y colaboración en las aplicaciones Microsoft 365." },
        ],
        questions: [{ q: "¿Dome reemplaza Word o PowerPoint?", a: "No reproduce sus editores nativos. Encaja cuando el valor está en trabajar con fuentes locales y Many; para archivos Office y coedición, Microsoft 365 tiene ventaja." }],
      },
      en: {
        category: "AI office suite", teaser: "Word, PowerPoint, Outlook and Copilot across Microsoft's suite.",
        answer: "Microsoft 365 Copilot helps draft in Word, create PowerPoint decks and work in Outlook and other apps. Dome brings local files, notes, people and Many into a desktop workspace with a configurable AI provider.",
        domeFor: ["Your sources are local files and projects.", "You choose Many's resources and tools.", "You want to review references and action permissions."],
        rivalFor: ["Deliverables require native Word, Excel or PowerPoint.", "Your organization works in Outlook, Teams and OneDrive.", "You want Copilot inside those apps."],
        rows: [
          { topic: "Documents", dome: "Markdown notes and project files in a local library.", rival: "Word and OneNote assisted by Copilot." },
          { topic: "Presentations", dome: "Studio generates content supported by the configured provider and tool.", rival: "Copilot creates and edits PowerPoint decks." },
          { topic: "Context", dome: "Many works with supplied resources and authorized tools.", rival: "Copilot uses Microsoft 365 context according to plan and permissions." },
          { topic: "Collaboration", dome: "Desktop work centered on a local library.", rival: "Co-editing within Microsoft 365 apps." },
        ],
        questions: [{ q: "Does Dome replace Word or PowerPoint?", a: "It does not reproduce their native editors. Dome fits local sources and Many; Microsoft 365 leads for Office files and co-editing." }],
      },
    },
  },
  {
    slug: "clickup", name: "ClickUp", mark: "⌄", icon: "/brands/clickup.svg", tone: "clickup",
    source: [
      { label: "ClickUp Brain", url: "https://help.clickup.com/hc/en-us/articles/12578085238039-What-is-ClickUp-Brain-AI" },
      { label: "Brain en tareas", url: "https://help.clickup.com/hc/en-us/articles/34958900405143-Use-Brain-AI-on-tasks" },
    ],
    locales: {
      es: {
        category: "Tareas y automatización", teaser: "Tareas, docs, agentes y Brain para equipos.",
        answer: "ClickUp une tareas, Docs, chat y automatizaciones; Brain puede preguntar por el trabajo, crear documentos, subtareas y otros resultados. Dome aborda el trabajo desde los archivos del proyecto, Many y agentes configurables en una app de escritorio.",
        domeFor: ["El material de partida son tus archivos y notas locales.", "Quieres definir proveedor, modelo y herramientas de Many.", "Necesitas revisar las acciones externas antes de aprobarlas."],
        rivalFor: ["Necesitas seguimiento detallado de tareas, responsables y estados.", "Tu equipo trabaja a diario en Docs, Chat y dashboards de ClickUp.", "Quieres Brain conectado al contexto compartido del equipo."],
        rows: [
          { topic: "Gestión", dome: "Proyectos como contexto de archivos, personas y trabajo de agentes.", rival: "Tareas, subtareas, listas, estados y vistas para equipos." },
          { topic: "IA", dome: "Many responde desde recursos y puede usar herramientas autorizadas.", rival: "Brain responde sobre tareas y Docs, crea elementos y puede ejecutar flujos." },
          { topic: "Documentos", dome: "Notas Markdown en la bóveda local y archivos conservados en su formato.", rival: "Docs y wikis dentro del workspace compartido." },
          { topic: "Automatización", dome: "Workflows y tareas programadas mientras Dome está disponible.", rival: "Automatizaciones y agentes ligados al workspace de ClickUp." },
        ],
        questions: [{ q: "¿Dome tiene más IA que ClickUp?", a: "No sería una comparación justa: ClickUp Brain también crea documentos, tareas y presentaciones. Dome se distingue por su biblioteca local y la configuración del proveedor y permisos de Many." }],
      },
      en: {
        category: "Tasks and automation", teaser: "Tasks, docs, agents and Brain for teams.",
        answer: "ClickUp combines tasks, Docs, chat and automations; Brain can answer about work and create documents, subtasks and other outputs. Dome starts from project files, Many and configurable agents in a desktop app.",
        domeFor: ["Your starting point is local files and notes.", "You choose Many's provider, model and tools.", "You want to approve external actions after review."],
        rivalFor: ["You need detailed tasks, owners and statuses.", "Your team lives in ClickUp Docs, Chat and dashboards.", "You want Brain connected to a shared team workspace."],
        rows: [
          { topic: "Management", dome: "Projects provide context for files, people and agent work.", rival: "Tasks, subtasks, lists, statuses and team views." },
          { topic: "AI", dome: "Many answers from resources and uses authorized tools.", rival: "Brain answers about tasks and Docs, creates items and can run workflows." },
          { topic: "Documents", dome: "Local Markdown notes and files kept in their format.", rival: "Docs and wikis in the shared workspace." },
          { topic: "Automation", dome: "Workflows and scheduled tasks while Dome is available.", rival: "Automations and agents linked to ClickUp workspace." },
        ],
        questions: [{ q: "Does Dome have more AI than ClickUp?", a: "That would not be fair: ClickUp Brain also creates docs, tasks and decks. Dome differs in its local library and Many's configurable provider and permissions." }],
      },
    },
  },
  {
    slug: "notebooklm", name: "NotebookLM", mark: "✳", tone: "notebooklm",
    source: [
      { label: "NotebookLM: investigación y formatos", url: "https://blog.google/innovation-and-ai/products/notebooklm/better-research-notebooklm/" },
      { label: "Aprender con Dome", url: "https://dome.dowi.es/funciones/learning" },
    ],
    locales: {
      es: {
        category: "Investigación y estudio", teaser: "Preguntas, citas y materiales de estudio desde tus fuentes.",
        answer: "NotebookLM responde con fuentes atribuidas y crea materiales de investigación y estudio; sus formatos recientes incluyen documentos, imágenes y presentaciones en ciertos planes. Dome permite reunir archivos por proyecto, preguntar con Many y generar tarjetas o quizzes, manteniendo las notas en la biblioteca local.",
        domeFor: ["Quieres que la investigación conviva con los archivos y notas locales del proyecto.", "Necesitas convertir fuentes en tarjetas o quizzes y seguir estudiando.", "Quieres usar agentes y otras herramientas desde el mismo contexto."],
        rivalFor: ["Buscas un cuaderno dedicado a sintetizar fuentes y citas.", "Quieres los formatos de NotebookLM, como audio o mapas mentales.", "Tu flujo de estudio ya está en el ecosistema Google."],
        rows: [
          { topic: "Fuentes", dome: "Archivos y notas organizados por proyecto; búsqueda semántica requiere configuración.", rival: "Fuentes añadidas a cada cuaderno y respuestas con atribución." },
          { topic: "Estudio", dome: "Tarjetas y quizzes generados a partir de recursos, con historial.", rival: "Guías, resúmenes, audio y otros formatos desde el cuaderno." },
          { topic: "Creación", dome: "Many y Estudio preparan resultados según proveedor y herramienta.", rival: "NotebookLM genera varios artefactos y exportaciones según disponibilidad del plan." },
          { topic: "Almacenamiento", dome: "Notas Markdown y archivos en la biblioteca del ordenador.", rival: "Cuadernos y fuentes gestionados en el servicio de Google." },
        ],
        questions: [{ q: "¿Puede Dome responder a preguntas sobre un PDF científico?", a: "Sí, si el texto se extrae y la búsqueda documental está configurada. Revisa siempre la referencia y el documento original antes de citarlo." }],
      },
      en: {
        category: "Research and study", teaser: "Questions, citations and study material from your sources.",
        answer: "NotebookLM answers with attributed sources and creates research and study material; recent formats include documents, images and presentations on eligible plans. Dome organizes files by project, lets Many answer questions, and generates flashcards or quizzes with notes kept locally.",
        domeFor: ["You want research alongside local project files and notes.", "You need source-based flashcards and quizzes with study history.", "You want agents and other tools in the same project context."],
        rivalFor: ["You need a notebook dedicated to source synthesis and citations.", "You want NotebookLM's audio or mind maps.", "You already study in Google's ecosystem."],
        rows: [
          { topic: "Sources", dome: "Project files and notes; semantic search needs configuration.", rival: "Sources added to notebooks with attributed answers." },
          { topic: "Study", dome: "Generated flashcards and quizzes with history.", rival: "Guides, summaries, audio and other notebook outputs." },
          { topic: "Creation", dome: "Many and Studio prepare results depending on provider and tool.", rival: "NotebookLM creates artifacts and exports according to plan availability." },
          { topic: "Storage", dome: "Markdown notes and files in your computer's library.", rival: "Notebooks and sources managed in Google's service." },
        ],
        questions: [{ q: "Can Dome answer questions about a scientific PDF?", a: "Yes, when text extraction and document search are configured. Always check references against the original before citing." }],
      },
    },
  },
  {
    slug: "canva", name: "Canva", mark: "C", tone: "canva",
    source: [
      { label: "Canva Magic Design", url: "https://www.canva.com/magic-design/" },
      { label: "Estudio de Dome", url: "https://dome.dowi.es/funciones/studio" },
    ],
    locales: {
      es: {
        category: "Presentaciones y social", teaser: "Diseño visual, presentaciones y publicaciones con IA.",
        answer: "Canva ofrece un editor visual, plantillas y Magic Design para presentaciones y piezas de redes sociales. Dome conecta la preparación de contenido con las fuentes del proyecto mediante Many y Estudio; la generación y exportación dependen del proveedor y de la herramienta configurados.",
        domeFor: ["Partes de investigación, documentos y notas del proyecto.", "Quieres preparar el contenido y revisar fuentes antes de diseñar o publicar.", "Necesitas conectar el resultado con agentes y flujos de Dome."],
        rivalFor: ["Buscas plantillas, controles visuales y edición gráfica detallada.", "Necesitas piezas listas para redes en tamaños específicos.", "Tu prioridad es colaborar en diseños y presentaciones."],
        rows: [
          { topic: "Punto de partida", dome: "Documentos y contexto del proyecto en la biblioteca.", rival: "Lienzo de diseño, plantillas y activos visuales." },
          { topic: "IA", dome: "Many prepara contenido; Estudio genera resultados según modelo y herramienta.", rival: "Magic Design genera diseños, presentaciones y piezas sociales." },
          { topic: "Edición", dome: "Revisión de resultados dentro del workspace; capacidad variable por modalidad.", rival: "Editor visual con formatos, plantillas y personalización de marca." },
          { topic: "Social", dome: "Integraciones y acciones con revisión antes de publicar.", rival: "Diseño de publicaciones y formatos para redes." },
        ],
        questions: [{ q: "¿Dome sustituye al editor de Canva?", a: "No ofrece el mismo lienzo ni la misma biblioteca de plantillas. Dome encaja al investigar, redactar y preparar contenido desde tus fuentes; Canva destaca en el acabado visual." }],
      },
      en: {
        category: "Presentations and social", teaser: "Visual design, decks and social content with AI.",
        answer: "Canva offers a visual editor, templates and Magic Design for presentations and social graphics. Dome connects content preparation to project sources through Many and Studio; generation and export depend on the configured provider and tool.",
        domeFor: ["You start from project research, docs and notes.", "You need to review sources before design or publication.", "You connect the result to Dome agents and workflows."],
        rivalFor: ["You need templates and detailed graphic editing.", "You need social assets in specific sizes.", "Your priority is collaborating on designs and decks."],
        rows: [
          { topic: "Starting point", dome: "Documents and project context in the library.", rival: "Design canvas, templates and visual assets." },
          { topic: "AI", dome: "Many prepares content; Studio generates outputs by model and tool.", rival: "Magic Design generates designs, decks and social graphics." },
          { topic: "Editing", dome: "Review outputs in the workspace; capabilities vary by mode.", rival: "Visual editor with formats, templates and brand controls." },
          { topic: "Social", dome: "Connected actions require review before publication.", rival: "Social post designs in platform formats." },
        ],
        questions: [{ q: "Does Dome replace Canva's editor?", a: "It does not offer the same canvas or template library. Dome fits researching and drafting from your sources; Canva excels at visual finishing." }],
      },
    },
  },
  {
    slug: "github-projects", name: "GitHub Projects", mark: "⌘", icon: "/brands/github.svg", tone: "github",
    source: [
      { label: "GitHub Projects", url: "https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects" },
      { label: "GitHub Copilot agents", url: "https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents" },
      { label: "Integraciones de Dome", url: "https://dome.dowi.es/funciones/integrations" },
    ],
    locales: {
      es: {
        category: "Seguimiento de desarrollo", teaser: "Issues, pull requests, tableros y roadmaps junto al código.",
        answer: "GitHub Projects sigue issues y pull requests con tablas, tableros, roadmaps y automatizaciones. Dome puede reunir documentación y contexto del proyecto, conectar GitHub y dejar que Many prepare trabajo con permisos; no sustituye el repositorio ni la revisión de código.",
        domeFor: ["Quieres unir PDFs, notas, personas y decisiones con el contexto del proyecto.", "Necesitas pedir a Many análisis o borradores antes de actuar.", "Trabajas también fuera del código y de los issues."],
        rivalFor: ["Tu seguimiento depende de issues, PRs y ramas del repositorio.", "Necesitas tableros y roadmaps sincronizados con el código.", "Quieres delegar cambios de código a Copilot y revisar PRs en GitHub."],
        rows: [
          { topic: "Objeto principal", dome: "Proyecto con archivos, notas y herramientas conectadas.", rival: "Issues y PRs vinculados al repositorio." },
          { topic: "Seguimiento", dome: "Agentes, workflows y resultados revisables; no replica los tableros de GitHub Projects.", rival: "Tablas, tableros, roadmaps, campos y gráficos de progreso." },
          { topic: "IA", dome: "Many trabaja con recursos y herramientas autorizadas, incluida una conexión GitHub configurada.", rival: "Copilot puede investigar y realizar tareas de código con revisión de PR." },
          { topic: "Código", dome: "Se conecta a GitHub; el código y su revisión siguen en el repositorio.", rival: "Git, issues, PRs y colaboración de desarrollo nativos." },
        ],
        questions: [{ q: "¿Dome compite con Git?", a: "Git es control de versiones. La comparación útil es con GitHub Projects como centro de seguimiento: Dome amplía el contexto hacia documentos y acciones de Many, mientras GitHub sigue siendo el lugar del código." }],
      },
      en: {
        category: "Development tracking", teaser: "Issues, pull requests, boards and roadmaps next to code.",
        answer: "GitHub Projects tracks issues and pull requests in tables, boards, roadmaps and automations. Dome can gather project documents and context, connect GitHub and let Many prepare work with permissions; it does not replace the repo or code review.",
        domeFor: ["You connect PDFs, notes, people and decisions with project context.", "You ask Many to analyze or draft before acting.", "Your work extends beyond code and issues."],
        rivalFor: ["Tracking depends on repo issues, PRs and branches.", "You need code-synced boards and roadmaps.", "You delegate code changes to Copilot and review PRs in GitHub."],
        rows: [
          { topic: "Core object", dome: "Project with files, notes and connected tools.", rival: "Repo-linked issues and pull requests." },
          { topic: "Tracking", dome: "Agents, workflows and reviewable results; not GitHub Projects boards.", rival: "Tables, boards, roadmaps, fields and progress charts." },
          { topic: "AI", dome: "Many works with authorized resources and tools, including configured GitHub access.", rival: "Copilot can research and perform code tasks with PR review." },
          { topic: "Code", dome: "Connects to GitHub; code and review remain in the repo.", rival: "Native Git, issues, PRs and developer collaboration." },
        ],
        questions: [{ q: "Does Dome compete with Git?", a: "Git is version control. GitHub Projects is the useful comparison for tracking: Dome adds docs and Many actions; GitHub remains the home of code." }],
      },
    },
  },
  {
    slug: "obsidian", name: "Obsidian", mark: "◇", icon: "/brands/obsidian.svg", tone: "obsidian",
    source: [
      { label: "Cómo guarda datos Obsidian", url: "https://obsidian.md/help/data-storage" },
      { label: "Biblioteca de Dome", url: "https://dome.dowi.es/funciones/library" },
    ],
    locales: {
      es: {
        category: "Notas locales", teaser: "Bóvedas Markdown en archivos de tu ordenador.",
        answer: "Obsidian guarda notas Markdown en bóvedas locales y se centra en conectar y explorar conocimiento personal. Dome también mantiene notas en una bóveda local, pero las sitúa junto a otros archivos, personas, Many, agentes e integraciones del proyecto.",
        domeFor: ["Necesitas que notas y otros archivos convivan en un proyecto.", "Quieres preguntar a Many por el material y preparar acciones.", "Buscas una app de trabajo que reúna biblioteca, agentes e integraciones."],
        rivalFor: ["Tu prioridad es escribir y enlazar notas Markdown.", "Quieres un ecosistema amplio de plugins para tu bóveda.", "Prefieres un editor de conocimiento personal con sus propias vistas."],
        rows: [
          { topic: "Archivos", dome: "Biblioteca de proyecto con archivos y notas Markdown.", rival: "Bóvedas de archivos Markdown locales." },
          { topic: "IA", dome: "Many usa recursos y herramientas configuradas para responder y actuar.", rival: "La función central es la gestión de notas; las ampliaciones dependen de plugins." },
          { topic: "Contexto", dome: "Proyectos, personas, documentos y conexiones de servicio.", rival: "Notas, enlaces, propiedades y plugins de la bóveda." },
          { topic: "Sincronización", dome: "Servicio de sincronización configurado por separado.", rival: "Obsidian Sync u otros métodos para la bóveda local." },
        ],
        questions: [{ q: "¿Puedo seguir usando Obsidian?", a: "Sí. Ambos parten de archivos locales. Comprueba la compatibilidad de rutas y formato antes de compartir una misma carpeta entre aplicaciones." }],
      },
      en: {
        category: "Local notes", teaser: "Markdown vaults in files on your computer.",
        answer: "Obsidian stores Markdown notes in local vaults and focuses on linking and exploring personal knowledge. Dome also keeps notes locally, alongside other files, people, Many, agents and project integrations.",
        domeFor: ["Notes and other files should live in one project.", "You want to ask Many about material and prepare actions.", "You need a work app joining library, agents and integrations."],
        rivalFor: ["Your priority is writing and linking Markdown notes.", "You want a broad vault plugin ecosystem.", "You prefer a personal knowledge editor with its own views."],
        rows: [
          { topic: "Files", dome: "Project library of files and Markdown notes.", rival: "Vaults of local Markdown files." },
          { topic: "AI", dome: "Many uses configured resources and tools to answer and act.", rival: "Core focus is note management; extensions depend on plugins." },
          { topic: "Context", dome: "Projects, people, documents and service connections.", rival: "Notes, links, properties and vault plugins." },
          { topic: "Sync", dome: "Sync service configured separately.", rival: "Obsidian Sync or other methods for the local vault." },
        ],
        questions: [{ q: "Can I keep using Obsidian?", a: "Yes. Both start with local files. Check paths and format before sharing a folder between apps." }],
      },
    },
  },
];

export const comparisonPath = (slug: string, locale: Locale) =>
  `${locale === "en" ? "/en" : ""}/conectores/${slug}`;
