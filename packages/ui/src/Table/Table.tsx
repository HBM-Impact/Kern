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
            {columns.map((column, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: generic data has no stable column key
              <th scope="col" key={`${String(column.label)}-${index}`}>
                {wrapPrimitive(column.label)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: generic data has no stable row key
            <tr key={index}>
              {columns.map((column, colIndex) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: generic data has no stable column key
                <td key={`${String(column.label)}-${colIndex}`}>
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
