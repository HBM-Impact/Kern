import { toSlug } from "./to-slug";

export function createProductSlug(id: number, title: string) {
  return `${id}-${toSlug(title)}`;
}
