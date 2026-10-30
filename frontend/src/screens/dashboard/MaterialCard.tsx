import { NoteShape } from "./NoteShape";

type MaterialCardProps = {
  name: string;
  color: string;
  createdAt: Date;
};

const DATE_FORMAT: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };

export function MaterialCard({ name, color, createdAt }: MaterialCardProps) {
  return (
    <NoteShape color={color}>
      <h2 className="mt-auto truncate text-lg font-medium" title={name}>
        {name}
      </h2>
      <p className="text-sm">
        <time dateTime={createdAt.toISOString()}>{createdAt.toLocaleDateString(undefined, DATE_FORMAT)}</time>
      </p>
    </NoteShape>
  );
}
