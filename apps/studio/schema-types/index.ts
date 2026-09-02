import { page } from "./documents/page";
import { routeMeta } from "./documents/route-meta";
import { siteSettings } from "./documents/site-settings";
import { heroModule } from "./modules/hero-module";
import { modules } from "./modules/modules";
import { productCarouselModule } from "./modules/product-carousel-module";
import { blockContent } from "./objects/block-content";
import { externalLink } from "./objects/external-link";
import { navLink } from "./objects/nav-link";

export const schemaTypes = [
  siteSettings,
  page,
  routeMeta,
  modules,
  heroModule,
  productCarouselModule,
  blockContent,
  externalLink,
  navLink,
];
