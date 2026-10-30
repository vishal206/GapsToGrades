import { FolderShape } from "./FolderShape";

type FolderCardProps = {
  name: string;
  color: string;
  createdAt: Date;
};

const DATE_FORMAT: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };

export function FolderCard({ name, color, createdAt }: FolderCardProps) {
  return (
    <FolderShape color={color}>
      <h2 className="mt-auto truncate text-lg font-medium" title={name}>
        {name}
      </h2>
      <p className="text-sm">
        Empty · <time dateTime={createdAt.toISOString()}>{createdAt.toLocaleDateString(undefined, DATE_FORMAT)}</time>
      </p>
    </FolderShape>
  );
}
