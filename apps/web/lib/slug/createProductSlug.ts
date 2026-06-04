import { toSlug } from "./toSlug";

export function createProductSlug(id: number, title: string) {
  return `${id}-${toSlug(title)}`;
}
