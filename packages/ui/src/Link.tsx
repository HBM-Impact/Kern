import * as stylex from "@stylexjs/stylex";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { colors, font, size } from "./tokens.stylex";

type Props<T extends ElementType = "a"> = {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

const styles = stylex.create({
  link: {
    fontFamily: font.sans,
    fontSize: font.size1,
    fontWeight: 400,
    position: "relative",
    textDecoration: "none",
    width: "fit-content",
    paddingBlock: size[2],
    transition: "color 0.3s ease-out",
    color: { default: "inherit", ":hover": colors.accent },
    // The underline grows on hover. Nesting `:hover` inside the pseudo-element
    // is how StyleX expresses what was `.link:hover::after`.
    "::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      height: "1px",
      backgroundColor: "currentColor",
      opacity: 0.5,
      transition: "width 0.3s ease-out",
      width: { default: 0, ":hover": "100%" },
    },
  },
});

export function Link<T extends ElementType = "a">({ as, ...props }: Props<T>) {
  const Component = (as ?? "a") as ElementType;
  return <Component {...stylex.props(styles.link)} {...props} />;
}
