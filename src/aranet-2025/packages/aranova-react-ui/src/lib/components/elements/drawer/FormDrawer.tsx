'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '../../tw';
import { FormUi } from '../../../interfaces';

interface Props {
  title: string;
  newTitle: string;
  viewTitle: string;
  subtitle?: string;
  idField: string;
  children: React.ReactNode;
  pageDataSelection: React.ReactNode;
  ui: FormUi,
}
export const FormDrawer = ({
  title,
  newTitle,
  viewTitle,
  subtitle,
  idField,
  pageDataSelection,
  children,
  ui,
}: Props) => {
  if (!ui.openedDrawer) return null;
  const isEdit = (): boolean => {
    if (ui.selectedItem && Array.isArray(ui.selectedItem) && ui.selectedItem.length > 0) {
      return ui.selectedItem[0][idField];
    }
    return ui.selectedItem && ui.selectedItem[idField];
  }

  return (
    <Dialog open={ui.openedDrawer} onClose={ui.closeDrawer} className="relative z-5">
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden dark:bg-zinc-900/70 bg-zinc-400/70">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen md:max-w-2xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full overflow-y-scroll flex-col shadow-xl dark:shadow-zinc-600 bg-zinc-50 lg:bg-zinc-50 dark:bg-zinc-800 dark:lg:bg-zinc-800">
                <div className="flex-1">
                  {/* Header */}
                  <div className="px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between space-x-3">
                     
                     <div className='block sm:flex'>
                      <div className="space-y-1">
                        <DialogTitle className="text-base font-semibold">
                          {ui.modeForm === 'show' ? viewTitle : isEdit() ? title : newTitle}
                        </DialogTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {ui.modeForm === 'edit' ? subtitle : ''}
                        </p>
                      </div>
                       {pageDataSelection && 
                       <div className='sm:ml-10 mt-5 justify-self-start '>
                        {pageDataSelection}
                       </div>

                       }
                       </div>
                      <div className="flex h-7 items-center">
                        <Button plain type="button" onClick={() => ui.closeDrawer()}>
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
