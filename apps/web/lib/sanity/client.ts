import { createClient } from "next-sanity";

function required(name: string, value: string | undefined) {
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

export const projectId = required(
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
);
export const dataset = required(
  "NEXT_PUBLIC_SANITY_DATASET",
  process.env.NEXT_PUBLIC_SANITY_DATASET,
);

// Pinned on purpose: the API contract is versioned by date, so bumping this is
// a deliberate migration rather than a silent change.
export const apiVersion = "2026-09-02";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
