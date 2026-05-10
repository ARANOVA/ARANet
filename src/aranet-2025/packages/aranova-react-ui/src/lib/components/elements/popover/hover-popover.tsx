'use client';

import { useState, useRef, ReactNode } from 'react';
import { createPortal } from "react-dom";
import { useFloating, autoUpdate, arrow, FloatingArrow, autoPlacement } from '@floating-ui/react';

interface Props {
  title: ReactNode;
  children: ReactNode;
}

export const HoverPopover = ({ title, children }: Props) => {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef(null);
  const {refs, floatingStyles, context} = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [
      arrow({
        element: arrowRef,
      }),
      autoPlacement({
        alignment: 'start',
        allowedPlacements: ['bottom-start', 'bottom-end'],
      }),
    ],
  });

  return (
    <div className="relative inline-block">
      <div
        ref={refs.setReference}
        className="inline-flex items-centercursor-pointer"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {title}

        {/* Panel */}
        {open && 
          createPortal(
            <div 
              ref={refs.setFloating}
              style={floatingStyles}
              className="absolute z-10 w-48 rounded-xl bg-white/90 dark:bg-zinc-800/90 shadow-lg border border-gray-200 dark:border-gray-700 p-2">
              <FloatingArrow
                ref={arrowRef}
                context={context}
                className="fill-white/90 dark:fill-zinc-800/90"
              />
              {children}
            </div>,
            document.body
          )
        }
      </div>
    </div>
  );
};
