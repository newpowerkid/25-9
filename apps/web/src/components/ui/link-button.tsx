import { Link } from "~/i18n/navigation";

import { Button } from "./button";

type LinkButtonProps = React.ComponentProps<typeof Button> &
  React.ComponentProps<typeof Link>;

export const LinkButton = ({ children, href, ...props }: LinkButtonProps) => {
  return (
    <Button {...props} asChild>
      <Link href={href}>{children}</Link>
    </Button>
  );
};
