import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  // The add tiles.
  children: ReactNode;
};

export function EmptyState({ title, description, children }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      {/* Same gap as FolderGrid; the tiles size themselves, so they don't change once the first item exists. */}
      <div className="flex gap-6">{children}</div>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="text-sm text-ink-muted">{description}</p>
      </div>
    </div>
  );
}
