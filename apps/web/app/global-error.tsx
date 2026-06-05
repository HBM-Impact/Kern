"use client";

import "@repo/ui/globals.css";
import { Button } from "@repo/ui/buttons";
import { Display } from "@repo/ui/typography/display";
import { Prose } from "@repo/ui/typography/prose";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  return (
    <html lang="en">
      <body>
        <section>
          <hgroup>
            <Display variant="display1" as="h1">
              Something went wrong!
            </Display>
            <Prose>
              {error.message || "An unexpected error occurred"}
            </Prose>
          </hgroup>
          <Button onClick={reset}>Try again</Button>
        </section>
      </body>
    </html>
  );
}
