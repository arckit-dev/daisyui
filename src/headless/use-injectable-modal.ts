import { useCallback, useState } from 'react';

export type ModalControls = {
  open: () => void;
  close: () => void;
};

export const useInjectableModal = (onReady?: (controls: ModalControls) => void) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  onReady?.({ open, close });

  return { isOpen, open, close };
};
