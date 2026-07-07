'use client';

import { type ComponentProps, useEffect, useRef } from 'react';
import { type ToastType, useToaster } from 'react-hot-toast';
import type { Toast } from 'react-hot-toast/headless';
import { Alert, type AlertClass, type AlertProps } from '../primitives/alert';
import type { PlacementX, PlacementY } from '../primitives/placement';
import { cn } from '../utils';

type ToastTypeColor = Exclude<ToastType, 'custom' | 'blank'>;

type ToasterProps<Prefix extends `${string}toast` = 'toast'> = ComponentProps<'div'> &
  Pick<AlertClass, 'kind'> & {
    directionX?: `${Prefix}-${PlacementX}`;
    directionY?: `${Prefix}-${PlacementY}`;
  };

const toastColors: Record<ToastTypeColor, NonNullable<AlertProps['color']>> = {
  success: 'alert-success',
  error: 'alert-error',
  loading: 'alert-info'
};

const NOT_ALLOWED_TYPES = new Set(['blank', 'custom']);

const isAllowedTypeColor = (toast: Toast): toast is Toast & { type: ToastTypeColor } => !NOT_ALLOWED_TYPES.has(toast.type);

export const Toaster = ({ directionX, directionY, kind, ...props }: ToasterProps) => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (typeof container?.showPopover !== 'function') return;
    // A native <dialog> opened with showModal() paints in the top layer, above any z-index.
    // Re-showing the popover on each toast update puts the container back on top of it.
    if (container.matches(':popover-open')) container.hidePopover();
    if (toasts.some((toast: Toast) => toast.visible)) container.showPopover();
  }, [toasts]);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: This <div> only handles mouse events for UX purposes and is not intended to be an interactive or focusable element
    <div
      ref={containerRef}
      popover='manual'
      className={cn('toast z-10 m-0 overflow-visible border-0 bg-transparent', directionX, directionY)}
      onMouseEnter={startPause}
      onMouseLeave={endPause}
      {...props}
    >
      {toasts
        .filter((toast: Toast) => toast.visible)
        .map((toast: Toast) => (
          <Alert
            key={toast.id}
            {...(kind ? { kind } : {})}
            {...(isAllowedTypeColor(toast) ? { color: toastColors[toast.type] } : {})}
            {...toast.ariaProps}
          >
            {toast.icon}
            {typeof toast.message === 'function' ? toast.message(toast) : toast.message}
          </Alert>
        ))}
    </div>
  );
};
