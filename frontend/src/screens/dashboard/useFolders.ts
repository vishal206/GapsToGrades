import { useState } from "react";
import { pickFolderColor } from "./folderColors";
import { nextUntitledName } from "./untitledName";

export type Folder = {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
  // null for a folder on the dashboard itself.
  parentId: string | null;
};

export function useFolders() {
  const [folders, setFolders] = useState<Folder[]>([]);

  // Names and colours are counted among the new folder's siblings only.
  function addFolder(parentId: string | null) {
    setFolders((current) => {
      const siblings = current.filter((folder) => folder.parentId === parentId);
      return [
        ...current,
        {
          id: crypto.randomUUID(),
          name: nextUntitledName("folder", siblings.map((folder) => folder.name)),
          color: pickFolderColor(siblings.at(-1)?.color),
          createdAt: new Date(),
          parentId,
        },
      ];
    });
  }

  return { folders, addFolder };
}
