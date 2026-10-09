import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window)) return;
    const elements = document.querySelectorAll("[data-reveal]");
    const reveal = (element) => element.classList.remove("reveal-pending");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight && !element.contains(document.activeElement)) {
        element.classList.add("reveal-pending");
        observer.observe(element);
      }
    });
    const onFocus = (event) => {
      const section = event.target.closest("[data-reveal]");
      if (section) reveal(section);
    };
    const onMotionChange = () => { if (motion.matches) elements.forEach(reveal); };
    document.addEventListener("focusin", onFocus);
    motion.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      elements.forEach(reveal);
      document.removeEventListener("focusin", onFocus);
      motion.removeEventListener("change", onMotionChange);
    };
  }, [pathname]);
  return null;
}
