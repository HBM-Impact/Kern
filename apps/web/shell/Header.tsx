import { colors, size } from "@repo/ui/tokens.stylex";
import { Display } from "@repo/ui/typography/display";
import * as stylex from "@stylexjs/stylex";
import { Link } from "@/primitives/link/Link";

const styles = stylex.create({
  header: {
    paddingBlock: size[3],
    paddingInline: { default: size[5], "@media (width <= 480px)": size[3] },
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.borderMuted,
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: size[2],
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: size[2],
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: size[3],
  },
});

export function Header() {
  return (
    <header {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.content)}>
        <div {...stylex.props(styles.logo)}>
          <Link href="/" title="Kern">
            <Display uppercase as="span" variant="display4">
              Kern
            </Display>
          </Link>
        </div>
        <nav {...stylex.props(styles.nav)} aria-label="Main">
          <Link href="/products">Products</Link>
          <Link href="/favorites">Favorites</Link>
          <Link href="/cart">Cart</Link>
        </nav>
      </div>
    </header>
  );
}
