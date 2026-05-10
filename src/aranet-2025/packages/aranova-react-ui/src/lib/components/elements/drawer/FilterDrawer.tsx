'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '../../tw';
import { FormUi } from '../../../interfaces/form-ui.interface';

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  ui: FormUi,

}
export const FilterDrawer = ({
  title,
  subtitle,
  children,
  ui,

}: Props) => {
  if (!ui.openedLeftDrawer) return null;

  return (
    <Dialog open={ui.openedLeftDrawer} onClose={ui.closeLeftDrawer} className="relative z-5">
      <div className="fixed inset-0 " />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen sm:max-w-xs transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full overflow-y-scroll flex-col shadow-xl dark:shadow-zinc-600 bg-zinc-50 dark:bg-zinc-800">
                <div className="flex-1">
                  {/* Header */}
                  <div className="px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between space-x-3">
                      <div className="space-y-1">
                        <DialogTitle className="text-base font-semibold">
                          {title}
                        </DialogTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {subtitle}
                        </p>
                      </div>
                      <div className="flex h-7 items-center">
                        <Button plain type="button" onClick={() => ui.closeLeftDrawer()}>
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Cerrar panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className='px-4 sm:px-6'>
                    {children}
                  </div>
                </div>
                </div>
              </DialogPanel>
            </div>
          </div>
      </div>
    </Dialog>
  );
}
