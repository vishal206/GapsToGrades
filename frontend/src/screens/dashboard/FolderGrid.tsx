import { AddFolderCard } from "./AddFolderCard";
import { FolderCard } from "./FolderCard";
import type { Folder } from "./useFolders";

type FolderGridProps = {
  folders: Folder[];
  onAdd: () => void;
};

export function FolderGrid({ folders, onAdd }: FolderGridProps) {
  return (
    <ul aria-label="Folders" className="grid grid-cols-[repeat(auto-fill,14rem)] gap-6">
      {folders.map((folder) => (
        <li key={folder.id}>
          <FolderCard name={folder.name} color={folder.color} createdAt={folder.createdAt} />
        </li>
      ))}
      <li>
        <AddFolderCard onAdd={onAdd} />
      </li>
    </ul>
  );
}
