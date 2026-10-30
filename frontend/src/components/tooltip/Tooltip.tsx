import { useRef, useState, type FocusEvent, type PointerEvent, type ReactNode } from "react";

type TooltipProps = {
  label: string;
  children: ReactNode;
};

// Clears the arrow cursor, which hangs to the right of the pointer.
const CURSOR_GAP = 16;

// A primary bubble that follows the mouse over `children`, sitting to the right of the pointer, or to the
// right of the focused element for keyboard users. Visual only — give the trigger its own aria-label.
export function Tooltip({ label, children }: TooltipProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const bubble = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  // Moved through the ref rather than state, so following the pointer never re-renders.
  function place(clientX: number, clientY: number) {
    const box = wrapper.current?.getBoundingClientRect();
    if (!box || !bubble.current) return;
    bubble.current.style.left = `${clientX - box.left + CURSOR_GAP}px`;
    bubble.current.style.top = `${clientY - box.top}px`;
  }

  function handlePointer(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    place(event.clientX, event.clientY);
    setVisible(true);
  }

  function handleFocus(event: FocusEvent<HTMLElement>) {
    if (!event.target.matches(":focus-visible")) return;
    const target = event.target.getBoundingClientRect();
    place(target.right, target.top + target.height / 2);
    setVisible(true);
  }

  return (
    <div
      ref={wrapper}
      className="relative"
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
        className={`pointer-events-none absolute z-10 origin-left -translate-y-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-ink transition-[opacity,scale] duration-150 ease-out ${visible ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
      >
        {label}
      </span>
    </div>
  );
}
