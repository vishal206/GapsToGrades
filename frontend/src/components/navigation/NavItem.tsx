import type { ComponentType, SVGProps } from "react";

type NavItemProps = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  active?: boolean;
  collapsed?: boolean;
};

export function NavItem({ label, href, icon: Icon, active = false, collapsed = false }: NavItemProps) {
  return (
    <a
      href={href}
      title={collapsed ? label : undefined}
      aria-current={active ? "page" : undefined}
      className={`relative flex items-center gap-3 py-2.5 pl-4 pr-3 text-[15px] transition-colors ${
        active ? "text-ink" : "text-ink-muted hover:text-ink"
      }`}
    >
      {active && (
        <span aria-hidden="true" className="absolute left-0 h-6 w-0.5 rounded-full bg-primary" />
      )}
      <Icon className="size-5 shrink-0" />
      <span className={collapsed ? "sr-only" : "whitespace-nowrap"}>{label}</span>
    </a>
  );
}
