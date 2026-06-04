import { notFound } from "next/navigation";

export default function CatchAllPage(_: PageProps<"/[locale]/[...rest]">) {
  notFound();
}
