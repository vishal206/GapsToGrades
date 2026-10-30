import { useState } from "react";
import { DashboardIcon } from "../icons/DashboardIcon";
import { NavItem } from "./NavItem";
import { SideNavToggle } from "./SideNavToggle";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: DashboardIcon },
];

type SideNavProps = {
  activeHref: string;
  onNavigate: (href: string) => void;
};

export function SideNav({ activeHref, onNavigate }: SideNavProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative shrink-0 rounded-panel bg-surface py-8 transition-[width] duration-200 ${
        collapsed ? "w-19" : "w-52"
      }`}
    >
      <div className="flex h-full flex-col overflow-hidden px-3">
        <p className="whitespace-nowrap text-xl font-medium tracking-tight text-ink pl-1">
          {collapsed ? "G" : "GapsTo"}
          <span className="text-primary-text">{collapsed ? "." : "Grades"}</span>
        </p>

        <nav aria-label="Main" className="mt-10">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavItem
                  {...item}
                  active={item.href === activeHref}
                  collapsed={collapsed}
                  onNavigate={onNavigate}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <SideNavToggle
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />
    </aside>
  );
}
