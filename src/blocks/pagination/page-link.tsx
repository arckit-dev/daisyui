import type { ReactNode } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { ButtonLink } from '../../primitives/button-link';

const pageHref = (href: string) => (number: number) => {
  const [baseHref, queryString] = href.split('?');

  const searchParams = new URLSearchParams(queryString);
  searchParams.delete('page');
  searchParams.append('page', number.toString());

  return `${baseHref}?${searchParams.toString()}`;
};

type RenderLink = (props: { href: string; children: ReactNode; className: string; title: string }) => ReactNode;

export const PreviousPageLink = ({
  number,
  disabled,
  href,
  renderLink
}: { number: number; disabled: boolean; href: string; renderLink?: RenderLink }) => {
  const resolvedHref = pageHref(href)(number);
  const props = { href: resolvedHref, className: 'btn btn-ghost join-item', title: 'Page précédente' };

  if (renderLink && !disabled) {
    return renderLink({ ...props, children: <RiArrowLeftSLine aria-hidden={true} /> });
  }

  return (
    <ButtonLink disabled={disabled} className='join-item' kind='btn-ghost' href={resolvedHref} title='Page précédente'>
      <RiArrowLeftSLine aria-hidden={true} />
    </ButtonLink>
  );
};

export const NextPageLink = ({
  number,
  disabled,
  href,
  renderLink
}: { number: number; disabled: boolean; href: string; renderLink?: RenderLink }) => {
  const resolvedHref = pageHref(href)(number);
  const props = { href: resolvedHref, className: 'btn btn-ghost join-item', title: 'Page suivante' };

  if (renderLink && !disabled) {
    return renderLink({ ...props, children: <RiArrowRightSLine aria-hidden={true} /> });
  }

  return (
    <ButtonLink disabled={disabled} className='join-item' kind='btn-ghost' href={resolvedHref} title='Page suivante'>
      <RiArrowRightSLine aria-hidden={true} />
    </ButtonLink>
  );
};

export const PageLink = ({
  number,
  isCurrent,
  href,
  renderLink
}: { number: number; isCurrent: boolean; href: string; renderLink?: RenderLink }) => {
  const resolvedHref = pageHref(href)(number);
  const className = isCurrent ? 'btn btn-primary join-item' : 'btn btn-ghost join-item';
  const props = { href: resolvedHref, className, title: `Page ${number}` };

  if (renderLink) {
    return renderLink({ ...props, children: number });
  }

  return (
    <ButtonLink
      className='join-item'
      {...(isCurrent ? { color: 'btn-primary' } : { kind: 'btn-ghost' })}
      href={resolvedHref}
      title={`Page ${number}`}
    >
      {number}
    </ButtonLink>
  );
};
