import type { ComponentType, SVGProps } from "react";

type IconButtonProps = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  count?: number;
  onClick?: () => void;
};

export function IconButton({ label, icon: Icon, count = 0, onClick }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={count > 0 ? `${label} (${count})` : label}
      title={label}
      className="relative grid size-10 place-items-center rounded-full bg-surface text-ink transition-colors hover:bg-ink hover:text-white"
    >
      <Icon className="size-5" />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute top-0 right-0 grid h-4 min-w-4 place-items-center rounded-full bg-accent-red px-1 text-[10px] font-semibold text-white"
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
