import { weakKey } from "@repo/utils/weakKey";
import type { ReactNode } from "react";
import { Typography } from "../Typography/Typography";
import styles from "./Table.module.css";

type Column<T> = {
  label: ReactNode | string;
  value: (row: T) => ReactNode;
};

function wrapPrimitive(content: ReactNode) {
  if (typeof content === "object") return content;
  return <Typography>{String(content)}</Typography>;
}

type Props<T> = {
  data: T[];
  columns: Column<T>[];
};

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
}: Props<T>) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th scope="col" key={weakKey(column)}>
                {wrapPrimitive(column.label)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={weakKey(row)}>
              {columns.map((column) => (
                <td key={weakKey(column)}>
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
