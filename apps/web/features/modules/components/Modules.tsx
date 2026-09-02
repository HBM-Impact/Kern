import { Hero } from "@/features/modules/components/Hero";
import { ProductCarouselModule } from "@/features/modules/components/ProductCarouselModule";
import type { Module } from "@/features/modules/types";

type Props = { modules: Module[] };

// A module added to the schema before this switch knows about it renders
// nothing rather than crashing the page.
function unhandled(_module: never) {
  return null;
}

export function Modules({ modules }: Props) {
  return (
    <>
      {modules.map((module) => {
        switch (module._type) {
          case "heroModule":
            return <Hero key={module._key} {...module} />;
          case "productCarouselModule":
            return <ProductCarouselModule key={module._key} {...module} />;
          default:
            return unhandled(module);
        }
      })}
    </>
  );
}
