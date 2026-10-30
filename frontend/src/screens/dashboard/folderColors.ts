// Full class names so Tailwind can find them. Each sets currentColor, which FolderShape fills with.
const FOLDER_COLORS = [
  "text-folder-green",
  "text-folder-yellow",
  "text-folder-orange",
  "text-folder-blue",
];

// Random, but never the same as the previous folder so neighbours always differ.
export function pickFolderColor(previous?: string) {
  const choices = FOLDER_COLORS.filter((color) => color !== previous);
  return choices[Math.floor(Math.random() * choices.length)];
}
