import { size } from "@repo/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

/** Shared by FavoritesView and its skeleton. */
export const favoritesStyles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: size[3],
    listStyle: "none",
    width: "100%",
    padding: 0,
    margin: 0,
  },
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: size[3],
  },
});
