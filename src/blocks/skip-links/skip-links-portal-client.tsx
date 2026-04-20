'use client';

import { type ComponentProps, lazy, Suspense } from 'react';
import type { SkipLinksPortal as SkipLinksPortalComponent } from './skip-links-portal';

const SkipLinksPortal = lazy(() => import('./skip-links-portal').then((m) => ({ default: m.SkipLinksPortal })));

type SkipLinksPortalClientProps = ComponentProps<typeof SkipLinksPortalComponent>;

export const SkipLinksPortalClient = (props: SkipLinksPortalClientProps) => (
  <Suspense>
    <SkipLinksPortal {...props} />
  </Suspense>
);
