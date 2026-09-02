"use client";

import { Button } from "@repo/ui/buttons";
import { catchError, type ErrorInfo } from "next/error";
import { PageHeader } from "@/shell/PageHeader";

type Props = {
  title?: string;
};

function ErrorFallback(
  { title = "Something went wrong" }: Props,
  { error, retry }: ErrorInfo,
) {
  return (
    <section>
      <PageHeader
        title={title}
        description={error instanceof Error ? error.message : undefined}
      />
      <Button onClick={() => retry()}>Try again</Button>
    </section>
  );
}

export const ErrorBoundary = catchError(ErrorFallback);
