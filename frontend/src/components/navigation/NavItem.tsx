import type { ComponentType, MouseEvent, SVGProps } from "react";

type NavItemProps = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  active?: boolean;
  collapsed?: boolean;
  onNavigate: (href: string) => void;
};

export function NavItem({ label, href, icon: Icon, active = false, collapsed = false, onNavigate }: NavItemProps) {
  // Plain clicks navigate in place; modified ones (new tab/window) are left to the browser.
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(href);
  }

  return (
    <a
      href={href}
      onClick={handleClick}
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
