import { PlusIcon } from "../../components/icons/PlusIcon";
import { Tooltip } from "../../components/tooltip/Tooltip";
import { NoteShape } from "./NoteShape";

type AddMaterialCardProps = {
  onAdd: () => void;
};

// The button's ::after stretches over the whole note (folded corner included), so the entire tile is clickable.
export function AddMaterialCard({ onAdd }: AddMaterialCardProps) {
  return (
    <Tooltip label="Add material">
      <NoteShape recessOnHover>
        <div className="flex flex-1 items-center justify-center">
          <button
            type="button"
            onClick={onAdd}
            aria-label="Add material"
            className="rounded-full text-ink after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <PlusIcon className="size-12" />
          </button>
        </div>
      </NoteShape>
    </Tooltip>
  );
}
