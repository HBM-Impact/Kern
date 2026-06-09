import ky from "ky";

export const commerceClient = ky.create({
  prefix: "https://dummyjson.com",
});
