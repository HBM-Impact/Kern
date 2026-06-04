import "ky";

declare module "ky" {
  interface Options {
    next?: {
      revalidate?: number | false;
      tags?: string[];
    };
  }
}
