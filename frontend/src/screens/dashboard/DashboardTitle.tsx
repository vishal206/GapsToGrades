import { ChevronRightIcon } from "../../components/icons/ChevronRightIcon";

type Crumb = {
  id: string;
  name: string;
};

type DashboardTitleProps = {
  // The open folder's ancestors from the top down, ending with the open folder. Empty on the dashboard itself.
  trail: Crumb[];
  onNavigate: (folderId: string | null) => void;
};

const TITLE = "text-4xl font-semibold tracking-tight";

// Inside a folder the title becomes a breadcrumb, still one 40px line so it stays aligned with the
// wordmark. pr-40 keeps it clear of the header actions (3 × 40px buttons + 2 × 12px gaps).
export function DashboardTitle({ trail, onNavigate }: DashboardTitleProps) {
  const current = trail.at(-1);
  if (!current) return <h1 className={TITLE}>Dashboard</h1>;

  const ancestors = [{ id: null, name: "Dashboard" }, ...trail.slice(0, -1)];

  return (
    <nav aria-label="Breadcrumb" className="pr-40">
      <ol className={`flex items-center gap-2 ${TITLE}`}>
        {ancestors.map((crumb) => (
          <li key={crumb.id ?? "dashboard"} className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate(crumb.id)}
              className="truncate rounded-sm text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {crumb.name}
            </button>
            <ChevronRightIcon className="size-6 shrink-0 text-ink-muted" />
          </li>
        ))}
        <li aria-current="page" className="min-w-0">
          <h1 className="truncate">{current.name}</h1>
        </li>
      </ol>
    </nav>
  );
}
