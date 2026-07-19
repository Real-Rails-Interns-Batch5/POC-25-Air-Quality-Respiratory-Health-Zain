"use client";

import { useCallback } from "react";

type ScrollLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export default function ScrollLink({ href, onClick, ...props }: ScrollLinkProps) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const sectionId = href.slice(1);
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", href);
      }

      if (onClick) {
        onClick(event);
      }
    },
    [href, onClick]
  );

  return <a {...props} href={href} onClick={handleClick} />;
}
