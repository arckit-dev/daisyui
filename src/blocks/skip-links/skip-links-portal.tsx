'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { SkipLinks, skipLinksId } from './skip-links';

export const SkipLinksPortal = ({
  links,
  elementId = skipLinksId,
  children
}: {
  links: { label: string; anchor: string }[];
  children: string;
  elementId?: string;
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(<SkipLinks links={links} label={children} />, document.getElementById(elementId) ?? document.body);
};
