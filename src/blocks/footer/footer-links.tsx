import type { ReactNode } from 'react';
import { Link, type LinkProps } from '../../primitives/link';
import { cn } from '../../utils';

type RenderLink = (props: { href: string; children: ReactNode; className?: string }) => ReactNode;

export type FooterLink = {
  key: string;
  linkProps: LinkProps;
};

export type FooterLinksProps = {
  links: FooterLink[];
  orientation?: 'vertical' | 'horizontal';
  className?: string;
  renderLink?: RenderLink;
};

export const FooterLinks = ({ links, orientation = 'horizontal', className, renderLink }: FooterLinksProps) => (
  <div
    className={cn(
      orientation === 'horizontal' && 'flex flex-row flex-wrap gap-4',
      orientation === 'vertical' && 'flex flex-col flex-wrap gap-1.5',
      className
    )}
  >
    {links.map(({ key, linkProps }) =>
      renderLink ? (
        <span key={key}>{renderLink({ href: linkProps.href, children: linkProps.children, className: 'link' })}</span>
      ) : (
        <Link key={key} color='none' {...linkProps} />
      )
    )}
  </div>
);
