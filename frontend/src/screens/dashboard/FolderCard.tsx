import { FolderShape } from "./FolderShape";

type FolderCardProps = {
  name: string;
  color: string;
  createdAt: Date;
  itemCount: number;
  onOpen: () => void;
};

const DATE_FORMAT: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };

function describeCount(count: number) {
  return count === 0 ? "Empty" : `${count} ${count === 1 ? "item" : "items"}`;
}

// The name is the button; its ::after stretches over the whole folder (tab included), so the entire tile opens it.
export function FolderCard({ name, color, createdAt, itemCount, onOpen }: FolderCardProps) {
  return (
    <FolderShape color={color} recessOnHover>
      <h2 className="mt-auto truncate text-lg font-medium" title={name}>
        <button
          type="button"
          onClick={onOpen}
          className="rounded-sm after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {name}
        </button>
      </h2>
      <p className="text-sm">
        {describeCount(itemCount)} ·{" "}
        <time dateTime={createdAt.toISOString()}>{createdAt.toLocaleDateString(undefined, DATE_FORMAT)}</time>
      </p>
    </FolderShape>
  );
}
