import { size } from "@repo/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { PortableText } from "next-sanity";
import type { BlockContent } from "@/sanity.types";

type Props = { value: BlockContent };

const styles = stylex.create({
  body: {
    display: "flex",
    flexDirection: "column",
    gap: size[3],
    maxWidth: "70ch",
  },
});

export function PortableTextBody({ value }: Props) {
  return (
    <div {...stylex.props(styles.body)}>
      <PortableText value={value} />
    </div>
  );
}
