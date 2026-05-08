import type { ComponentProps } from 'react';
import { cn } from '../utils';
import type { Color } from './color';
import type { Scale } from './scale';

export type SelectClass<Prefix extends `${string}select` = 'select'> = {
  color?: `${Prefix}-${Color}` | undefined;
  kind?: `${Prefix}-${'ghost'}` | undefined;
  scale?: `${Prefix}-${Scale}` | undefined;
};

export type SelectProps = ComponentProps<'select'> & SelectClass;

export const Select = ({ className, color, kind, scale, ...props }: SelectProps) => (
  <select className={cn('select', color, kind, scale, className)} {...props} />
);
