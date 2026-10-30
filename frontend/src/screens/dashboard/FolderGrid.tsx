import { AddFolderCard } from "./AddFolderCard";
import { AddMaterialCard } from "./AddMaterialCard";
import { FolderCard } from "./FolderCard";
import { MaterialCard } from "./MaterialCard";
import type { Folder } from "./useFolders";
import type { Material } from "./useMaterials";

type FolderGridProps = {
  folders: Folder[];
  materials?: Material[];
  countItems: (folderId: string) => number;
  onOpen: (folderId: string) => void;
  onAddFolder: () => void;
  // Omitted on the dashboard itself, where only folders can be added.
  onAddMaterial?: () => void;
};

export function FolderGrid({ folders, materials = [], countItems, onOpen, onAddFolder, onAddMaterial }: FolderGridProps) {
  return (
    <ul aria-label="Folders and materials" className="flex flex-wrap gap-6">
      {folders.map((folder) => (
        <li key={folder.id}>
          <FolderCard
            name={folder.name}
            color={folder.color}
            createdAt={folder.createdAt}
            itemCount={countItems(folder.id)}
            onOpen={() => onOpen(folder.id)}
          />
        </li>
      ))}
      {materials.map((material) => (
        <li key={material.id}>
          <MaterialCard name={material.name} color={material.color} createdAt={material.createdAt} />
        </li>
      ))}
      <li>
        <AddFolderCard onAdd={onAddFolder} />
      </li>
      {onAddMaterial && (
        <li>
          <AddMaterialCard onAdd={onAddMaterial} />
        </li>
      )}
    </ul>
  );
}
