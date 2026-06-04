import { Display } from "@repo/ui/Display";
import { Typography } from "@repo/ui/Typography";

type Props = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: Props) {
  return (
    <hgroup>
      <Display as="h1" variant="display2">
        {title}
      </Display>
      {description ? <Typography>{description}</Typography> : null}
    </hgroup>
  );
}
