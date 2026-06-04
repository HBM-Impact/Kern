import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const {
  Link: IntlLink,
  getPathname,
  redirect,
  usePathname,
  useRouter,
} = createNavigation(routing);
