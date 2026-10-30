import { EmptyFolders } from "./EmptyFolders";
import { FolderGrid } from "./FolderGrid";
import { useFolders } from "./useFolders";

export function DashboardScreen() {
  const { folders, addFolder } = useFolders();

  return (
    <section className="flex min-h-full flex-col gap-8">
      <h1 className="text-4xl font-semibold tracking-tight">Dashboard</h1>
      {folders.length === 0 ? <EmptyFolders onAdd={addFolder} /> : <FolderGrid folders={folders} onAdd={addFolder} />}
    </section>
  );
}
