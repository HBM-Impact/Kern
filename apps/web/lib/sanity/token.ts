// Server-only. Never import this from a module a client component can reach.
export const token = process.env.SANITY_API_READ_TOKEN;

if (!token) throw new Error("Missing SANITY_API_READ_TOKEN");
