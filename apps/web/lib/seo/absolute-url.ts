import { getPathname } from "@/i18n/navigation";
import { getBaseUrl } from "./get-base-url";

export function absoluteUrl(args: Parameters<typeof getPathname>[0]) {
  return `${getBaseUrl()}${getPathname(args)}`;
}
