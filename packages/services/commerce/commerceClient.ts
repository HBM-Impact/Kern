import ky from "ky";

export const commerceClient = ky.create({
  prefixUrl: "https://dummyjson.com",
});
