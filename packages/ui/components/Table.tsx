import { css } from "hono/css";
import type { Child } from "hono/jsx";
import { Typography } from "@/ui/Typography.tsx";

type Column<T> = {
  label: Child | string;
  value: (row: T) => Child;
};

function wrapPrimitive(content: Child) {
  if (typeof content === "object") return content;
  return <Typography>{content}</Typography>;
}

type Props<T> = {
  data: T[];
  columns: Column<T>[];
};

export function Table<T extends { [key: string]: unknown }>({ columns, data }: Props<T>) {
  return (
    <div class={container}>
      <table class={table}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th scope="col" key={`${String(column.label)}-${index}`}>
                {wrapPrimitive(column.label)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column, index) => (
                <td key={`${String(column.label)}-${index}`}>{wrapPrimitive(column.value(row))}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const container = css`
  overflow-x: auto;
  overflow: hidden;
  border: var(--border-size-1) solid var(--color-border);
  border-radius: var(--radius-2);
`;

const table = css`
  width: 100%;
  border-spacing: 0;
  table-layout: fixed;
  thead {
    background-color: var(--color-bg-muted);
    tr th {
      white-space: nowrap;
      text-align: left;
      padding: var(--size-3);
    }
  }
  tr {
    border-bottom: var(--border-size-1) solid var(--color-border);
    &:last-child {
      border-bottom: none;
    }
  }
  tbody {
    tr {
      td {
        white-space: nowrap;
        text-align: left;
        padding: var(--size-3);
      }
    }
  }
`;
