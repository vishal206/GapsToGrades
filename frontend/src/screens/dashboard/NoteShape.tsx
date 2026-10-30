import { useId, type ReactNode } from "react";
import { RecessFilter } from "./RecessFilter";

type NoteShapeProps = {
  color?: string;
  recessOnHover?: boolean;
  children: ReactNode;
};

// A card whose top-right corner is folded over, like NoteIcon. Narrower than a folder but the same
// height (15:17 at w-42 vs FolderShape's 20:17 at w-56), so notes and folders line up in one row.
// `color` is a text-* class the page fills with; the flap is that fill shaded with ink/10, and the
// content resets to text-ink. `recessOnHover` works as in FolderShape.
export function NoteShape({ color = "text-surface", recessOnHover = false, children }: NoteShapeProps) {
  const filterId = useId();

  return (
    <div
      className={`relative flex aspect-15/17 w-42 flex-col ${color} ${recessOnHover ? "group" : ""}`}
      style={recessOnHover ? { filter: `url(#${filterId})` } : undefined}
    >
      {recessOnHover && <RecessFilter id={filterId} />}
      <div aria-hidden="true" className="flex h-12">
        <div className="flex-1 rounded-tl-card bg-current" />
        <svg viewBox="0 0 48 48" className="size-12 shrink-0">
          <path className="fill-current" d="M0 0C3 0 4 1 6 3L45 42C47 44 48 45 48 48H0Z" />
          <path className="fill-ink/10" d="M0 0C3 0 4 1 6 3L45 42C47 44 48 45 48 48H12A12 12 0 0 1 0 36Z" />
        </svg>
      </div>
      <div className="flex flex-1 flex-col rounded-b-card bg-current p-5 pt-0">
        <div className="flex flex-1 flex-col text-ink">{children}</div>
      </div>
    </div>
  );
}
