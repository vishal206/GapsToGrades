import { ChevronRightIcon } from "../icons/ChevronRightIcon";

type SideNavToggleProps = {
  collapsed: boolean;
  onToggle: () => void;
};

// White bump that bulges out of the sidebar's right edge. The 20px primary button is centred 5px inside
// the edge, so 3/4 of it sits inside the sidebar. The SVG's x=1 is the edge (x=0 overlaps by 1px).
export function SideNavToggle({ collapsed, onToggle }: SideNavToggleProps) {
  return (
    <div className="absolute left-full top-5.5 -ml-px h-12 w-2.5">
      <svg viewBox="0 0 10 48" aria-hidden="true" className="absolute inset-0 size-full fill-surface">
        <path d="M0 7.85H1A5 5 0 0 0 3.37 12.1A14 14 0 0 1 3.37 35.9A5 5 0 0 0 1 40.15H0Z" />
      </svg>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={!collapsed}
        aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
        className="absolute -left-3.5 top-3.5 grid size-5 place-items-center rounded-full bg-primary text-ink transition-shadow duration-200 hover:inset-shadow-recess focus-visible:inset-shadow-recess"
      >
        <ChevronRightIcon className={`size-3 transition-transform ${collapsed ? "" : "rotate-180"}`} />
      </button>
    </div>
  );
}
