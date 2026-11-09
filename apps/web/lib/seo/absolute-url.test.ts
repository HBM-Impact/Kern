import { expect, test } from "vitest";
import { productHref } from "@/features/products/route";
import { absoluteUrl } from "./absolute-url";

test("absoluteUrl prefixes base URL and locale", () => {
  expect(
    absoluteUrl({
      href: productHref({ id: 7, title: "Lamp", category: "home" }),
      locale: "en",
    }),
  ).toBe("http://localhost:3000/en/products/home/7-lamp");
  expect(absoluteUrl({ href: "/", locale: "en" })).toBe(
    "http://localhost:3000/en",
  );
});
