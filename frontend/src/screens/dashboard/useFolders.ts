import { useState } from "react";
import { pickFolderColor } from "./folderColors";

export type Folder = {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
};

const UNTITLED_NAME = /^untitled-folder-(\d+)$/;

// One past the highest existing untitled number, so names never collide even after deletes or renames.
function nextUntitledName(folders: Folder[]) {
  const numbers = folders.map((folder) => Number(UNTITLED_NAME.exec(folder.name)?.[1] ?? 0));
  return `untitled-folder-${Math.max(0, ...numbers) + 1}`;
}

export function useFolders() {
  const [folders, setFolders] = useState<Folder[]>([]);

  function addFolder() {
    setFolders((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: nextUntitledName(current),
        color: pickFolderColor(current.at(-1)?.color),
        createdAt: new Date(),
      },
    ]);
  }

  return { folders, addFolder };
}
