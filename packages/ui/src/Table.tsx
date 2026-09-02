import { weakKey } from "@repo/utils/weak-key";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { border, colors, radius, size } from "./tokens.stylex";
import { Prose } from "./typography/Prose";

type Column<T> = {
  label: ReactNode | string;
  value: (row: T) => ReactNode;
};

function wrapPrimitive(content: ReactNode) {
  if (typeof content === "object") return content;
  return <Prose>{String(content)}</Prose>;
}

type Props<T> = {
  data: T[];
  columns: Column<T>[];
};

const styles = stylex.create({
  container: {
    overflow: "hidden",
    overflowX: "auto",
    borderWidth: border[1],
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: radius[2],
  },
  table: {
    width: "100%",
    borderSpacing: 0,
    tableLayout: "fixed",
  },
  head: {
    backgroundColor: colors.bgMuted,
  },
  // Was `.table tr`/`.table tr:last-child` — applied to the rows directly,
  // since Table renders every row itself.
  row: {
    borderBottomWidth: { default: border[1], ":last-child": 0 },
    borderBottomStyle: { default: "solid", ":last-child": "none" },
    borderBottomColor: colors.border,
  },
  cell: {
    whiteSpace: "nowrap",
    textAlign: "left",
    padding: size[3],
  },
});

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
}: Props<T>) {
  return (
    <div {...stylex.props(styles.container)}>
      <table {...stylex.props(styles.table)}>
        <thead {...stylex.props(styles.head)}>
          <tr {...stylex.props(styles.row)}>
            {columns.map((column) => (
              <th
                scope="col"
                key={weakKey(column)}
                {...stylex.props(styles.cell)}
              >
                {wrapPrimitive(column.label)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={weakKey(row)} {...stylex.props(styles.row)}>
              {columns.map((column) => (
                <td key={weakKey(column)} {...stylex.props(styles.cell)}>
                  {wrapPrimitive(column.value(row))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
