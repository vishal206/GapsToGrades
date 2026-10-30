import { useRef, useState, type FocusEvent, type PointerEvent, type ReactNode } from "react";

type TooltipProps = {
  label: string;
  children: ReactNode;
};

// Clears the arrow cursor, which hangs to the right of the pointer.
const CURSOR_GAP = 16;
// Minimum distance from the viewport edges.
const EDGE = 8;

// A primary bubble that follows the mouse over `children`, to the right of the pointer, or beside the
// focused element for keyboard users. It flips to the left when the right edge is too close and is clamped
// vertically, so it never leaves the screen. Visual only — give the trigger its own aria-label.
export function Tooltip({ label, children }: TooltipProps) {
  const bubble = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  // Fixed to the viewport (escapes overflow clipping) and moved through the ref rather than state, so
  // following the pointer never re-renders. `left`/`right` are the x edges to sit beside.
  function place(left: number, right: number, centerY: number) {
    const el = bubble.current;
    if (!el) return;
    const fitsRight = right + CURSOR_GAP + el.offsetWidth <= window.innerWidth - EDGE;
    const x = fitsRight ? right + CURSOR_GAP : left - CURSOR_GAP - el.offsetWidth;
    const y = centerY - el.offsetHeight / 2;
    el.style.left = `${Math.max(EDGE, x)}px`;
    el.style.top = `${Math.min(Math.max(EDGE, y), window.innerHeight - EDGE - el.offsetHeight)}px`;
    el.style.transformOrigin = fitsRight ? "left" : "right";
  }

  function handlePointer(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    place(event.clientX, event.clientX, event.clientY);
    setVisible(true);
  }

  function handleFocus(event: FocusEvent<HTMLElement>) {
    if (!event.target.matches(":focus-visible")) return;
    const target = event.target.getBoundingClientRect();
    place(target.left, target.right, target.top + target.height / 2);
    setVisible(true);
  }

  return (
    <div
      onPointerEnter={handlePointer}
      onPointerMove={handlePointer}
      onPointerLeave={() => setVisible(false)}
      onFocus={handleFocus}
      onBlur={() => setVisible(false)}
      onClick={() => setVisible(false)}
    >
      {children}
      <span
        ref={bubble}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-50 whitespace-nowrap rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-ink transition-[opacity,scale] duration-150 ease-out ${visible ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
      >
        {label}
      </span>
    </div>
  );
}
