import { expect, test } from "vitest";
import { parseProductId, productHref } from "./route";

test("productHref builds the slug form", () => {
  expect(
    productHref({ id: 12, title: "Rosé  Wine!", category: "groceries" }),
  ).toEqual({
    pathname: "/products/[category]/[id]",
    params: { category: "groceries", id: "12-ros-wine" },
  });
});

test("parseProductId accepts slug and bare id", () => {
  expect(parseProductId("12-ros-wine")).toBe(12);
  expect(parseProductId("12")).toBe(12);
});

test("parseProductId rejects ids that can't exist", () => {
  for (const segment of ["", "abc", "0", "0-x", "-3", "x-12"]) {
    expect(parseProductId(segment)).toBeNull();
  }
});

test("productHref round-trips through parseProductId", () => {
  const { params } = productHref({ id: 7, title: "Lamp", category: "home" });
  expect(parseProductId(params.id)).toBe(7);
});
