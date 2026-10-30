import { PlusIcon } from "../../components/icons/PlusIcon";
import { Tooltip } from "../../components/tooltip/Tooltip";
import { FolderShape } from "./FolderShape";

type AddFolderCardProps = {
  onAdd: () => void;
};

// The button's ::after stretches over the whole folder (tab included), so the entire tile is clickable.
export function AddFolderCard({ onAdd }: AddFolderCardProps) {
  return (
    <Tooltip label="Add folder">
      <FolderShape recessOnHover>
        <div className="flex flex-1 items-center justify-center">
          <button
            type="button"
            onClick={onAdd}
            aria-label="Add folder"
            className="rounded-full text-ink after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <PlusIcon className="size-12" />
          </button>
        </div>
      </FolderShape>
    </Tooltip>
  );
}
