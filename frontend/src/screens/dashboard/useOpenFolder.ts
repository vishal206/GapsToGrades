import { useEffect } from "react";
import { navigate, usePathname } from "../../router/navigation";
import type { Folder } from "./useFolders";

const DASHBOARD = "/dashboard";
const FOLDER_PREFIX = `${DASHBOARD}/`;

// The open folder lives in the URL path (/dashboard/<id>), so every folder has its own URL and the
// browser's back/forward step through them. Opening one pushes a history entry.
export function useOpenFolder(folders: Folder[]) {
  const pathname = usePathname();
  const routeId = pathname.startsWith(FOLDER_PREFIX) ? decodeURIComponent(pathname.slice(FOLDER_PREFIX.length)) : null;
  const known = folders.some((folder) => folder.id === routeId);

  // Folders aren't persisted yet, so after a reload the URL can name one that no longer exists:
  // fall back to the dashboard, replacing the dead entry rather than adding one.
  useEffect(() => {
    if (routeId && !known) navigate(DASHBOARD, { replace: true });
  }, [routeId, known]);

  function openFolder(folderId: string | null) {
    navigate(folderId ? `${FOLDER_PREFIX}${encodeURIComponent(folderId)}` : DASHBOARD);
  }

  return { openFolderId: known ? routeId : null, openFolder };
}
