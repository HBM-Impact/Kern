import { afterEach, expect, test, vi } from "vitest";
import { getProductById } from "./get-product-by-id";

const respond = (status: number, body: unknown = {}) =>
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => Response.json(body, { status })),
  );

afterEach(() => vi.unstubAllGlobals());

test("returns the product", async () => {
  respond(200, { id: 1, title: "Lamp" });
  expect(await getProductById({ id: "1" })).toEqual({ id: 1, title: "Lamp" });
});

test("returns null when the product doesn't exist", async () => {
  respond(404);
  expect(await getProductById({ id: "999999" })).toBeNull();
});

test("still throws on other HTTP errors", async () => {
  respond(403);
  await expect(getProductById({ id: "1" })).rejects.toThrow();
});
