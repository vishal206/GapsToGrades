type ProfileButtonProps = {
  name: string;
  onClick?: () => void;
};

function toInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export function ProfileButton({ name, onClick }: ProfileButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Profile: ${name}`}
      className="grid size-10 place-items-center rounded-full bg-tint-green text-sm font-medium text-ink transition-shadow duration-200 hover:inset-shadow-recess focus-visible:inset-shadow-recess"
    >
      <span aria-hidden="true">{toInitials(name)}</span>
    </button>
  );
}
