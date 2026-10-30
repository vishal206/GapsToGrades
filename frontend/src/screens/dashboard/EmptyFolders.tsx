import { AddFolderCard } from "./AddFolderCard";

type EmptyFoldersProps = {
  onAdd: () => void;
};

export function EmptyFolders({ onAdd }: EmptyFoldersProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      {/* Same width as a FolderGrid column, so the tile doesn't change size once the first folder exists. */}
      <div className="w-56">
        <AddFolderCard onAdd={onAdd} />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium">No folders yet</h2>
        <p className="text-sm text-ink-muted">Create a folder to keep notes, milestones and plans together.</p>
      </div>
    </div>
  );
}
