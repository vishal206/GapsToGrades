import type { ReactNode } from "react";

type FolderShapeProps = {
  color?: string;
  recessOnHover?: boolean;
  children: ReactNode;
};

// A card with a tab on its top-left, proportioned like FolderIcon: 20:17 overall, the tab's flat top
// spans 3/10 of the width and its S-curve slope ends at half the width. `color` is a text-* class;
// every part fills with currentColor, and the content resets to text-ink.
// `recessOnHover` fades in an inner shadow along the top edges on hover/keyboard focus. A CSS inset
// box-shadow can't follow the tab's curve, so an SVG filter traces the whole outline: invert the shape's
// alpha, blur and nudge it down, then keep only the part inside the shape. The filter is always applied;
// hover only animates the shade's flood-opacity, so it fades rather than snapping on.
export function FolderShape({ color = "text-surface", recessOnHover = false, children }: FolderShapeProps) {
  return (
    <div className={`relative flex aspect-20/17 flex-col ${color} ${recessOnHover ? "group filter-[url(#folder-recess)]" : ""}`}>
      {recessOnHover && (
        <svg aria-hidden="true" className="absolute size-0 text-ink">
          <filter id="folder-recess" x="-20%" y="-20%" width="140%" height="140%">
            <feComponentTransfer in="SourceAlpha" result="outside">
              <feFuncA type="table" tableValues="1 0" />
            </feComponentTransfer>
            <feGaussianBlur in="outside" stdDeviation="2" />
            <feOffset dy="2" result="shade" />
            <feFlood
              floodColor="currentColor"
              className="[flood-opacity:0] transition-[flood-opacity] duration-200 group-hover:[flood-opacity:0.1] group-has-focus-visible:[flood-opacity:0.1]"
            />
            <feComposite in2="shade" operator="in" />
            <feComposite in2="SourceAlpha" operator="in" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode />
            </feMerge>
          </filter>
        </svg>
      )}
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
