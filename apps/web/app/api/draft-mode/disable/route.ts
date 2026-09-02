import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

export async function GET() {
  (await draftMode()).disable();
  redirect(`/${routing.defaultLocale}`);
}
