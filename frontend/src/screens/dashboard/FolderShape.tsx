import { useId, type ReactNode } from "react";
import { RecessFilter } from "./RecessFilter";

type FolderShapeProps = {
  color?: string;
  recessOnHover?: boolean;
  children: ReactNode;
};

// A card with a tab on its top-left, proportioned like FolderIcon: 20:17 overall, the tab's flat top
// spans 3/10 of the width and its S-curve slope ends at half the width. `color` is a text-* class;
// every part fills with currentColor, and the content resets to text-ink.
// `recessOnHover` fades in the RecessFilter inner shadow on hover/keyboard focus. The filter id is
// generated, so the url() is set inline.
export function FolderShape({ color = "text-surface", recessOnHover = false, children }: FolderShapeProps) {
  const filterId = useId();

  return (
    <div
      className={`relative flex aspect-20/17 w-56 flex-col ${color} ${recessOnHover ? "group" : ""}`}
      style={recessOnHover ? { filter: `url(#${filterId})` } : undefined}
    >
      {recessOnHover && <RecessFilter id={filterId} />}
      <div aria-hidden="true" className="relative h-6 w-3/10 rounded-tl-card bg-current">
        <svg viewBox="0 0 32 24" className="absolute bottom-0 left-full h-6 w-8 fill-current">
          <path d="M0 0C14 0 18 24 32 24H0Z" />
        </svg>
      </div>
      <div className="flex flex-1 flex-col rounded-card rounded-tl-none bg-current p-5">
        <div className="flex flex-1 flex-col text-ink">{children}</div>
      </div>
    </div>
  );
}
