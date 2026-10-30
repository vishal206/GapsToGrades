import { useState } from "react";
import { pickFolderColor } from "./folderColors";
import { nextUntitledName } from "./untitledName";

export type Material = {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
  folderId: string;
};

export function useMaterials() {
  const [materials, setMaterials] = useState<Material[]>([]);

  // Names and colours are counted within the folder only.
  function addMaterial(folderId: string) {
    setMaterials((current) => {
      const siblings = current.filter((material) => material.folderId === folderId);
      return [
        ...current,
        {
          id: crypto.randomUUID(),
          name: nextUntitledName("material", siblings.map((material) => material.name)),
          color: pickFolderColor(siblings.at(-1)?.color),
          createdAt: new Date(),
          folderId,
        },
      ];
    });
  }

  return { materials, addMaterial };
}
