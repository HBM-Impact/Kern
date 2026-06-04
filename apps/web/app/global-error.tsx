"use client";

import "./globals.css";
import { Button } from "@repo/ui/buttons";
import { Display } from "@repo/ui/display";
import { Typography } from "@repo/ui/typography";

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
            <Typography>
              {error.message || "An unexpected error occurred"}
            </Typography>
          </hgroup>
          <Button onClick={reset}>Try again</Button>
        </section>
      </body>
    </html>
  );
}
