export function parseProductSlug(slug: string) {
  const match = slug.match(/^(\d+)/);
  if (!match) return null;
  const id = match[1];
  if (!id) return null;
  return Number.parseInt(id, 10);
}
