import { Display } from "@repo/ui/typography/display";
import { Prose } from "@repo/ui/typography/prose";

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
      {description ? <Prose>{description}</Prose> : null}
    </hgroup>
  );
}
