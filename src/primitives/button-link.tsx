import { Slot } from '@radix-ui/react-slot';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';
import type { ButtonClass } from './button';

export type ButtonLinkProps = ButtonClass & {
  href: string;
  asChild?: boolean;
  icon?: ReactNode;
  iconOnly?: boolean;
  target?: string;
  disabled?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const ButtonLink = ({
  className,
  children,
  target,
  color,
  icon,
  iconOnly,
  kind,
  behavior,
  scale,
  modifier,
  disabled,
  title,
  asChild,
  ...props
}: ButtonLinkProps) => {
  const buttonClasses = cn('btn', color, kind, behavior, scale, modifier, disabled && 'btn-disabled', className);
  const titleAttr = title ?? (iconOnly && typeof children === 'string' ? children : undefined);

  if (disabled) {
    return (
      <span className={buttonClasses} title={titleAttr} aria-disabled='true'>
        {icon && icon}
        {children && !iconOnly && children}
      </span>
    );
  }

  const Comp = asChild ? Slot : 'a';
  return (
    <Comp
      className={buttonClasses}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      title={titleAttr}
      {...props}
    >
      {icon && icon}
      {children && !iconOnly && children}
    </Comp>
  );
};
