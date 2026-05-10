'use client';

import { Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

interface ToastProps {
  title: string;
  subtitle?: string;
  type: 'success' | 'warning' | 'error' | 'info';
};

interface Props {
  className?: string;
  showedToast: any;
  toastProps: ToastProps | null;
  hideToast: any;
}

export const ToastAlert = ({ showedToast, toastProps, hideToast, className }: Props) => {

  if (!showedToast || !toastProps) return;
  // useEffect(() => {
  //   if (!text || !title) return;
  //   if (duration && duration > 0) {
  //     console.log("INIT");
  //     // interval = setInterval(() => {
  //     //   //console.log({remaining})
  //     //   setRemaining(remaining + incr);
  //     // }, incr)
  //     setTimeout(() => {
  //       showToast(false);
  //       setRemaining(duration);
  //       // if (interval != null) clearInterval(interval);
  //     }, duration);
  //   }
  // }, []);

  // const incr = 1000;

  const progressColors = {
    warning: 'bg-yellow-500 dark:bg-yellow-400',
    error: 'bg-red-500 dark:bg-red-400',
    success: 'bg-green-500 dark:bg-green-400',
    info: 'bg-blue-500 dark:bg-blue-400',
  }

  const bgColors = {
    warning: 'bg-yellow-100 dark:bg-yellow-50',
    error: 'bg-red-100 dark:bg-red-50',
    success: 'bg-green-100 dark:bg-green-50',
    info: 'bg-blue-100 dark:bg-blue-50',
  }

  const icons = {
    warning: <ExclamationTriangleIcon aria-hidden="true" className="size-5 text-yellow-500 dark:text-yellow-400" />,
    error: <ExclamationTriangleIcon aria-hidden="true" className="size-5 text-red-500 dark:text-red-400" />,
    success: <CheckCircleIcon aria-hidden="true" className="size-5 text-green-500 dark:text-green-400" />,
    info: <ExclamationCircleIcon aria-hidden="true" className="size-5 text-blue-500 dark:text-blue-400" />,
  };
  
  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className={clsx("pointer-events-none fixed z-10 inset-0 flex items-end px-4 py-6 sm:p-6", className)}
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition show={showedToast}>
            <div className={
              clsx(
                "pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 transition data-closed:opacity-0 data-enter:transform data-enter:duration-300 data-enter:ease-out data-closed:data-enter:translate-y-2 data-leave:duration-100 data-leave:ease-in data-closed:data-enter:sm:translate-x-2 data-closed:data-enter:sm:translate-y-0",
                bgColors[toastProps.type]
              )
            }>
              <div className="relative">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      {icons[toastProps.type]}
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-gray-900">
                        {toastProps.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {toastProps.subtitle}
                      </p>
                    </div>
                    <div className="ml-4 flex shrink-0">
                      <button
                        type="button"
                        onClick={() => hideToast()}
                        className="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-hidden"
                      >
                        <span className="sr-only">Cerrar</span>
                        <XMarkIcon aria-hidden="true" className="size-5" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* {(duration &&
                  <div
                  className={clsx(
                    "absolute bottom-0 end-0 start-0 h-1 w-20",
                    progressColors[type]
                  )}
                  style={{ width: `${(remaining / duration) * 100}%` }}
                ></div>
                )} */}
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
