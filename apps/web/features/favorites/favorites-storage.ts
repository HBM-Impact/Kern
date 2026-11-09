import { z } from "zod";

// localStorage is untrusted: malformed favorites reset to none.
export const favoritesStorage = z.array(z.number().int().positive()).catch([]);
