import { css } from "hono/css";
import type { Child, PropsWithChildren } from "hono/jsx";
import { IconButton } from "@/ui/Button/IconButton.tsx";
import { Display } from "@/ui/Display.tsx";
import { ArrowLeft } from "@/ui/Icons/Arrow/Left.tsx";
import { ArrowRight } from "@/ui/Icons/Arrow/Right.tsx";
import { Typography } from "@/ui/Typography.tsx";
import { generateId } from "@/utils/generateId.ts";

type Props = PropsWithChildren<{
  title: string;
  description?: string;
}>;

export function Carousel({ children, title, description }: Props) {
  const listId = generateId("carousel");
  return (
    <section class={containerStyle} x-data>
      <header class={headerStyle}>
        <div>
          <Display as="h3" variant="display3">
            {title}
          </Display>
          {description && (
            <Typography as="p" variant="label">
              {description}
            </Typography>
          )}
        </div>
        <div class={buttonContainerStyle}>
          <IconButton
            x-on:click={`(() => { const el = document.getElementById('${listId}'); const item = el?.querySelector('li'); if (el && item) el.scrollBy({ left: -item.offsetWidth, behavior: 'smooth' }); })()`}
            icon={<ArrowLeft />}
            aria-label="Scroll left"
          />
          <IconButton
            x-on:click={`(() => { const el = document.getElementById('${listId}'); const item = el?.querySelector('li'); if (el && item) el.scrollBy({ left: item.offsetWidth, behavior: 'smooth' }); })()`}
            icon={<ArrowRight />}
            aria-label="Scroll right"
          />
        </div>
      </header>
      <ol id={listId} class={listStyle}>
        {getChildElements(children)?.map((child) => (
          <li class={listItemStyle}>{child}</li>
        ))}
      </ol>
    </section>
  );
}

function getChildElements(children: Child) {
  if (Array.isArray(children)) {
    return children;
  }
  return [children];
}

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
`;

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const buttonContainerStyle = css`
  display: flex;
  gap: var(--size-3);
`;

const listStyle = css`
  display: flex;
  gap: var(--size-3);
  list-style: none;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
`;

const listItemStyle = css`
  scroll-snap-align: start;
  flex-shrink: 0;
`;
