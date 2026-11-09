import { expect, test } from "vitest";
import { listParams } from "./list-params";

test("omits sort fields when unset", () => {
  expect(listParams({ skip: 0, limit: 10 })).toEqual({ skip: 0, limit: 10 });
});

test("passes sort fields through", () => {
  expect(
    listParams({ skip: 20, limit: 10, sortBy: "price", order: "desc" }),
  ).toEqual({ skip: 20, limit: 10, sortBy: "price", order: "desc" });
});
