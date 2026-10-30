import type { Folder } from "./useFolders";

// The folder and its ancestors, from the dashboard's top-level folder down to `folderId` itself.
export function folderTrail(folders: Folder[], folderId: string | null) {
  const trail: Folder[] = [];
  let folder = folders.find((candidate) => candidate.id === folderId);
  while (folder) {
    trail.unshift(folder);
    const parentId = folder.parentId;
    folder = folders.find((candidate) => candidate.id === parentId);
  }
  return trail;
}
