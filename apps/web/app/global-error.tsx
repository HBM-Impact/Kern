"use client";

import "@repo/ui/globals.css";
import { Button } from "@repo/ui/buttons";
import { Container } from "@repo/ui/container";
import { PageHeader } from "@/shell/PageHeader";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  return (
    <html lang="en">
      <body>
        <Container as="section">
          <PageHeader
            title="Something went wrong!"
            description={error.message || "An unexpected error occurred"}
          />
          <Button onClick={reset}>Try again</Button>
        </Container>
      </body>
    </html>
  );
}
