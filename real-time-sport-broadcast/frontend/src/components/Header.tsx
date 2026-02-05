import type React from "react";

type HeaderProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;

const Header = ({ children, ...props }: HeaderProps) => {
  return <div {...props}>{children}</div>;
};

export default Header;
