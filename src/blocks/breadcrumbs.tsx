import type { ReactNode } from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';
import { ICON_MD } from '../icons/sizes';
import { ButtonLink } from '../primitives/button-link';
import { Link } from '../primitives/link';
import { cn } from '../utils';

type RenderLink = (props: { href: string; children: ReactNode; className?: string; title?: string }) => ReactNode;

export type BreadcrumbsProps = {
  back?: {
    label: string;
    href: string;
  };
  items: {
    label: string;
    href?: string;
  }[];
  className?: string;
  renderLink?: RenderLink;
};

export const Breadcrumbs = ({ back, items, className, renderLink }: BreadcrumbsProps) => {
  if (items.length === 0) return null;

  const nav = (
    <nav aria-label='Breadcrumb' className='breadcrumbs text-xs'>
      <ul>
        {items.map(({ label, href }) =>
          href ? (
            <li key={href}>
              {renderLink ? (
                renderLink({ href, children: label, className: 'link link-hover text-neutral' })
              ) : (
                <Link href={href} className='text-neutral'>
                  {label}
                </Link>
              )}
            </li>
          ) : (
            <li key={label} className='text-base-title'>
              {label}
            </li>
          )
        )}
      </ul>
    </nav>
  );

  return back ? (
    <div className={cn('flex items-center gap-2', className)}>
      {renderLink ? (
        renderLink({
          href: back.href,
          children: <RiArrowLeftLine size={ICON_MD} />,
          className: 'btn btn-xs btn-ghost btn-neutral btn-circle',
          title: back.label
        })
      ) : (
        <ButtonLink
          scale='btn-xs'
          kind='btn-ghost'
          color='btn-neutral'
          modifier='btn-circle'
          href={back.href}
          title={back.label}
        >
          <RiArrowLeftLine size={ICON_MD} />
        </ButtonLink>
      )}
      {nav}
    </div>
  ) : (
    <div className={className}>{nav}</div>
  );
};
