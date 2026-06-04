type Props = {
  // biome-ignore lint/suspicious/noExplicitAny: JSON-LD data is already typed by generator functions
  data: Record<string, any>;
};

export function JsonLdScript({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires this per Next.js docs
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
