// Animaciones sutiles de la landing con GSAP + ScrollTrigger.
//  - El contenido es VISIBLE por defecto en el HTML (SEO / no-JS).
//  - Si el usuario pide menos movimiento, no hacemos nada.
//  - Solo entonces ocultamos el estado inicial y lo revelamos al hacer scroll.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function init(): void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  gsap.registerPlugin(ScrollTrigger);

  // Reveals individuales
  gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
    gsap.set(el, { opacity: 0, y: 24 });
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () =>
        gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }),
    });
  });

  // Grupos con stagger (anima hijos directos)
  gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
    const items = gsap.utils.toArray<HTMLElement>(":scope > *", group);
    if (!items.length) return;
    gsap.set(items, { opacity: 0, y: 24 });
    ScrollTrigger.create({
      trigger: group,
      start: "top 88%",
      once: true,
      onEnter: () =>
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
        }),
    });
  });

  ScrollTrigger.refresh();
}

if (document.readyState !== "loading") init();
else document.addEventListener("DOMContentLoaded", init);
