import { Slot } from '@radix-ui/react-slot';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';
import type { Color } from './color';

export type LinkClass<Prefix extends `${string}link` = 'link'> = {
  color?: `${Prefix}-${Color}` | 'none';
  kind?: `${Prefix}-${'hover'}` | 'none';
};

export type LinkProps = LinkClass & {
  href: string;
  asChild?: boolean;
  icon?: ReactNode;
  iconOnly?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const linkClass: LinkClass = { color: 'link-primary', kind: 'link-hover' };

export const Link = ({
  className,
  children,
  target,
  icon,
  iconOnly,
  asChild,
  color = linkClass.color,
  kind = linkClass.kind,
  ...props
}: LinkProps) => {
  const Comp = asChild ? Slot : 'a';
  return (
    <Comp
      className={cn(
        'link',
        color !== 'none' && color,
        kind !== 'none' && kind,
        icon && 'inline-flex items-center gap-1',
        className
      )}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      title={iconOnly && typeof children === 'string' ? children : undefined}
      {...props}
    >
      {icon && icon}
      {children && !iconOnly && children}
    </Comp>
  );
};
