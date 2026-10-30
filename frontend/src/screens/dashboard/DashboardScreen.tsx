import { AddFolderCard } from "./AddFolderCard";
import { AddMaterialCard } from "./AddMaterialCard";
import { DashboardTitle } from "./DashboardTitle";
import { EmptyState } from "./EmptyState";
import { FolderGrid } from "./FolderGrid";
import { folderTrail } from "./folderTrail";
import { useFolders } from "./useFolders";
import { useMaterials } from "./useMaterials";
import { useOpenFolder } from "./useOpenFolder";

export function DashboardScreen() {
  const { folders, addFolder } = useFolders();
  const { materials, addMaterial } = useMaterials();
  // null shows the dashboard's top-level folders.
  const { openFolderId, openFolder } = useOpenFolder(folders);

  const childFolders = folders.filter((folder) => folder.parentId === openFolderId);
  const childMaterials = materials.filter((material) => material.folderId === openFolderId);
  const countItems = (folderId: string) =>
    folders.filter((folder) => folder.parentId === folderId).length +
    materials.filter((material) => material.folderId === folderId).length;
  const onAddFolder = () => addFolder(openFolderId);
  // Materials live inside folders, so the dashboard itself only offers "Add folder".
  const onAddMaterial = openFolderId ? () => addMaterial(openFolderId) : undefined;

  return (
    <section className="flex min-h-full flex-col gap-8">
      <DashboardTitle trail={folderTrail(folders, openFolderId)} onNavigate={openFolder} />
      {childFolders.length + childMaterials.length > 0 ? (
        <FolderGrid
          folders={childFolders}
          materials={childMaterials}
          countItems={countItems}
          onOpen={openFolder}
          onAddFolder={onAddFolder}
          onAddMaterial={onAddMaterial}
        />
      ) : onAddMaterial ? (
        <EmptyState title="This folder is empty" description="Add a folder to organise, or material to start learning.">
          <AddFolderCard onAdd={onAddFolder} />
          <AddMaterialCard onAdd={onAddMaterial} />
        </EmptyState>
      ) : (
        <EmptyState title="No folders yet" description="Create a folder to keep notes, milestones and plans together.">
          <AddFolderCard onAdd={onAddFolder} />
        </EmptyState>
      )}
    </section>
  );
}
