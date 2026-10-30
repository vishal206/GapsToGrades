import { useSyncExternalStore } from "react";

// Client-side navigation over the History API: clean paths (/dashboard/<id>) that change without a page
// reload. The server must answer every app path with index.html — Vite's dev and preview servers do;
// a production host needs a rewrite rule.

// pushState/replaceState don't fire popstate, so navigate() announces its own changes with this event.
const NAVIGATE_EVENT = "app:navigate";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(NAVIGATE_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(NAVIGATE_EVENT, onChange);
  };
}

function readPathname() {
  return window.location.pathname;
}

export function usePathname() {
  return useSyncExternalStore(subscribe, readPathname);
}

// Pushes a history entry, so the browser's back/forward step through it; `replace` overwrites the current one instead.
export function navigate(path: string, { replace = false } = {}) {
  if (path === window.location.pathname) return;
  if (replace) window.history.replaceState(null, "", path);
  else window.history.pushState(null, "", path);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
}
