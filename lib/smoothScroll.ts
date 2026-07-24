import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setSmoothScroll(next: Lenis | null) {
  instance = next;
}

export function scrollToTop() {
  if (instance) {
    instance.scrollTo(0, { duration: 1.4 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
