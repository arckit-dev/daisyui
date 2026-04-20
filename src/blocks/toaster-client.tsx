'use client';

import { type ComponentProps, lazy, Suspense } from 'react';
import type { Toaster as ToasterComponent } from './toaster';

const Toaster = lazy(() => import('./toaster').then((m) => ({ default: m.Toaster })));

type ToasterClientProps = ComponentProps<typeof ToasterComponent>;

export const ToasterClient = (props: ToasterClientProps) => (
  <Suspense>
    <Toaster {...props} />
  </Suspense>
);
