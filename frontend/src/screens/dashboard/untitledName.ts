// `untitled-<kind>-N`, one past the highest existing N, so names never collide even after deletes or renames.
export function nextUntitledName(kind: string, names: string[]) {
  const pattern = new RegExp(`^untitled-${kind}-(\\d+)$`);
  const numbers = names.map((name) => Number(pattern.exec(name)?.[1] ?? 0));
  return `untitled-${kind}-${Math.max(0, ...numbers) + 1}`;
}
