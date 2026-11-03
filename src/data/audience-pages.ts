import type { Locale } from "../i18n";
import type { SubpageCopy } from "../i18n/types";

export const audienceSlugs = ["estudiantes", "marketing", "equipos"] as const;
export type AudienceSlug = (typeof audienceSlugs)[number];

type RelatedFeature = { slug: string; label: string; description: string };
export type AudienceCopy = SubpageCopy & {
  relatedTitle: string;
  related: RelatedFeature[];
};

export const audiencePages: Record<AudienceSlug, Record<Locale, AudienceCopy>> = {
  estudiantes: {
    es: {
      title: "Dome para estudiantes",
      description: "Reúne apuntes y fuentes en una biblioteca local, escribe notas y prepara material de estudio con Many.",
      eyebrow: "Dome para estudiantes",
      h1: "Tus fuentes y tus notas, en un mismo lugar.",
      lead: "Organiza archivos por proyecto, escribe junto a tus documentos y usa Many para trabajar con el material que has reunido.",
      sections: [
        { h2: "Reúne el material", text: "Guarda archivos y notas en la biblioteca de un proyecto. La búsqueda te ayuda a volver a encontrar el recurso que necesitas." },
        { h2: "Estudia con tus fuentes", text: "Aporta tus documentos a Many y revisa las referencias de sus respuestas. Las herramientas de aprendizaje te permiten preparar contenido a partir de ese contexto." },
      ],
      primary: "Descargar Dome",
      secondary: "Ver todas las funciones",
      relatedTitle: "Empieza por aquí",
      related: [
        { slug: "library", label: "Biblioteca y búsqueda", description: "Organiza y recupera tus fuentes." },
        { slug: "editor", label: "Notas y editor", description: "Escribe junto al material de tu proyecto." },
        { slug: "learning", label: "Aprendizaje con tus fuentes", description: "Prepara material de estudio con contexto." },
      ],
    },
    en: {
      title: "Dome for students",
      description: "Bring notes and sources into a local library, write notes and prepare study material with Many.",
      eyebrow: "Dome for students",
      h1: "Your sources and notes, in one place.",
      lead: "Organize files by project, write alongside your documents and use Many to work with the material you have gathered.",
      sections: [
        { h2: "Gather your material", text: "Keep files and notes in a project's library. Search helps you find the resource you need again." },
        { h2: "Study with your sources", text: "Give Many your documents and review the references in its answers. Learning tools help you prepare material from that context." },
      ],
      primary: "Download Dome",
      secondary: "See all features",
      relatedTitle: "Start here",
      related: [
        { slug: "library", label: "Library and search", description: "Organize and retrieve your sources." },
        { slug: "editor", label: "Notes and editor", description: "Write alongside your project material." },
        { slug: "learning", label: "Learning with your sources", description: "Prepare study material in context." },
      ],
    },
  },
  marketing: {
    es: {
      title: "Dome para marketing",
      description: "Organiza fuentes, prepara contenido visual en Estudio y revisa flujos de trabajo en Dome.",
      eyebrow: "Dome para marketing",
      h1: "Del material de partida al contenido revisado.",
      lead: "Reúne referencias en un proyecto, prepara contenido con Many y comprueba el resultado antes de usarlo o exportarlo.",
      sections: [
        { h2: "Trabaja desde tus fuentes", text: "La biblioteca mantiene documentos y notas en el contexto del proyecto. Many puede utilizar esos recursos al preparar una respuesta." },
        { h2: "Revisa cada resultado", text: "Estudio permite preparar contenido visual. Los workflows encadenan pasos configurados y muestran el resultado para que puedas comprobarlo." },
      ],
      primary: "Descargar Dome",
      secondary: "Ver todas las funciones",
      relatedTitle: "Funciones relacionadas",
      related: [
        { slug: "library", label: "Biblioteca y búsqueda", description: "Mantén las referencias en contexto." },
        { slug: "studio", label: "Estudio y contenido visual", description: "Prepara y revisa contenido generado." },
        { slug: "workflows", label: "Workflows y automatizaciones", description: "Configura pasos y comprueba ejecuciones." },
      ],
    },
    en: {
      title: "Dome for marketing",
      description: "Organize sources, prepare visual content in Studio and review workflows in Dome.",
      eyebrow: "Dome for marketing",
      h1: "From source material to reviewed content.",
      lead: "Gather references in a project, prepare content with Many and check the result before using or exporting it.",
      sections: [
        { h2: "Work from your sources", text: "The library keeps documents and notes in project context. Many can use those resources when preparing an answer." },
        { h2: "Review each result", text: "Studio helps prepare visual content. Workflows connect configured steps and show the result so you can check it." },
      ],
      primary: "Download Dome",
      secondary: "See all features",
      relatedTitle: "Related features",
      related: [
        { slug: "library", label: "Library and search", description: "Keep references in context." },
        { slug: "studio", label: "Studio and visual content", description: "Prepare and review generated content." },
        { slug: "workflows", label: "Workflows and automations", description: "Configure steps and check runs." },
      ],
    },
  },
  equipos: {
    es: {
      title: "Dome para equipos",
      description: "Organiza recursos por proyecto y coordina agentes especializados con resultados revisables.",
      eyebrow: "Dome para equipos",
      h1: "Cada tarea con su contexto y sus herramientas.",
      lead: "Mantén los recursos del proyecto juntos, configura agentes para tareas concretas y revisa los resultados antes de actuar.",
      sections: [
        { h2: "Prepara el contexto", text: "La biblioteca reúne archivos y notas por proyecto. Los agentes pueden trabajar con los recursos y herramientas que les asignes." },
        { h2: "Coordina agentes", text: "Un equipo de agentes puede repartir trabajo mediante un supervisor. Revisa las instrucciones, el resultado y cualquier acción pendiente." },
      ],
      primary: "Descargar Dome",
      secondary: "Ver todas las funciones",
      relatedTitle: "Funciones relacionadas",
      related: [
        { slug: "agents", label: "Agentes y equipos", description: "Configura agentes especializados y equipos." },
        { slug: "workflows", label: "Workflows y automatizaciones", description: "Encadena tareas con resultados revisables." },
        { slug: "integrations", label: "Cuentas e integraciones", description: "Conecta solo los servicios que necesitas." },
      ],
    },
    en: {
      title: "Dome for teams",
      description: "Organize resources by project and coordinate specialized agents with reviewable results.",
      eyebrow: "Dome for teams",
      h1: "Give each task its context and tools.",
      lead: "Keep project resources together, configure agents for specific tasks and review results before taking action.",
      sections: [
        { h2: "Prepare the context", text: "The library gathers files and notes by project. Agents can work with the resources and tools you assign." },
        { h2: "Coordinate agents", text: "A team of agents can divide work through a supervisor. Review their instructions, results and any pending actions." },
      ],
      primary: "Download Dome",
      secondary: "See all features",
      relatedTitle: "Related features",
      related: [
        { slug: "agents", label: "Agents and teams", description: "Configure specialized agents and teams." },
        { slug: "workflows", label: "Workflows and automations", description: "Connect tasks with reviewable results." },
        { slug: "integrations", label: "Accounts and integrations", description: "Connect only the services you need." },
      ],
    },
  },
};

export const aboutPages: Record<Locale, SubpageCopy> = {
  es: {
    title: "Sobre nosotros — Dome",
    description: "Conoce el enfoque de Dome: un espacio de trabajo local para documentos, personas y acciones con IA revisables.",
    eyebrow: "Sobre Dome",
    h1: "Un espacio de trabajo donde el contexto permanece cerca.",
    lead: "Dome reúne documentos, personas y Many en una aplicación de escritorio. Su punto de partida es tu biblioteca local y el control sobre las acciones que preparas.",
    sections: [
      { h2: "Un proyecto, sus recursos", text: "Organiza archivos y notas en una biblioteca por proyectos. Many puede trabajar con ese contexto y mostrar las referencias de sus respuestas." },
      { h2: "Tú decides qué conectar", text: "Puedes elegir un proveedor de IA y conectar servicios opcionales. Antes de enviar o publicar, revisas la acción preparada." },
      { h2: "Dome en tus dispositivos", text: "La aplicación de escritorio está disponible para macOS, Windows y Linux. La extensión del navegador y la app móvil amplían los flujos de trabajo cuando las necesitas." },
    ],
    primary: "Descargar Dome",
    secondary: "Explorar funciones",
  },
  en: {
    title: "About us — Dome",
    description: "Learn about Dome's approach: a local workspace for documents, people and reviewable AI actions.",
    eyebrow: "About Dome",
    h1: "A workspace that keeps context close.",
    lead: "Dome brings documents, people and Many into a desktop app. It starts with your local library and your control over the actions you prepare.",
    sections: [
      { h2: "One project, its resources", text: "Organize files and notes in a project library. Many can work with that context and show references for its answers." },
      { h2: "You choose what to connect", text: "Choose an AI provider and connect optional services. Review prepared actions before sending or publishing." },
      { h2: "Dome on your devices", text: "The desktop app is available for macOS, Windows and Linux. The browser extension and mobile app extend workflows when you need them." },
    ],
    primary: "Download Dome",
    secondary: "Explore features",
  },
};
