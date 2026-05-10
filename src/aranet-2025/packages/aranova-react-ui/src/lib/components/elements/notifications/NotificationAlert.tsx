'use client';
import {
  CheckCircleIcon,
  DocumentArrowUpIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { Alert, AlertActions, AlertDescription, AlertTitle, Button } from '../../tw';
import { useState } from 'react';

interface Props {
  title?: string;
  text?: string | null;
  type?: 'warning' | 'error' | 'success' | 'muted' | 'info';
  className?: string;
  show?: boolean;
  setShow?: (state: boolean) => void;
  selectedTab?: string;
}

export const NotificationAlert = ({
  title,
  text,
  type,
  className,
  show,
  setShow, 
  selectedTab,
}: Props) => {
  let [isOpen, setIsOpen] = useState(false);
  if (!text || !title) return;
  if (!type) {
    type = 'warning';
  }
  const icons = {
    muted: null,

    info: (
      <QuestionMarkCircleIcon
        aria-hidden="true"
        className="size-5 text-blue-500"
      />
    ),
    warning: (
      <ExclamationTriangleIcon
        aria-hidden="true"
        className="size-5 text-yellow-500"
      />
    ),
    error: (
      <ExclamationTriangleIcon
        aria-hidden="true"
        className="size-5 text-red-500"
      />
    ),
    success: (
      <CheckCircleIcon aria-hidden="true" className="size-5 text-green-500" />
    ),
  };
  const typeColors: Record<string, string> = {
    muted:
      'text-zinc-800 prose-a:hover:text-zinc-900 bg-[#f9f9f9] border-[#999]',
    warning:
      'text-yellow-800 prose-a:hover:text-yellow-900 bg-[#fcf8e3] border-[#c09853]',
    error:
      'text-red-800 prose-a:hover:text-red-900 bg-[#f2dede] border-[#b94a48]',
    info: 'text-blue-800 prose-a:hover:text-[#2d6987] bg-[#d9edf7] border-[#3a87ad]',
    success:
      'text-green-800 prose-a:hover:text-green-900 bg-[#dff0d8] border-[#468847]',
  };

  if (show === false) return;

  return (
    <div
      className={clsx(
        className,
        'pointer-events-auto w-full rounded-lg shadow-lg outline-1 outline-black/5 transition data-closed:opacity-0 data-enter:transform data-enter:duration-300 data-enter:ease-out data-closed:data-enter:translate-y-2 data-leave:duration-100 data-leave:ease-in data-closed:data-enter:sm:translate-x-2 data-closed:data-enter:sm:translate-y-0 dark:-outline-offset-1 dark:outline-white/10',
        {
          'bg-yellow-50': type === 'warning',
          'bg-green-50': type === 'success',
          'bg-red-50': type === 'error',
          'bg-blue-50': type === 'info',
          'bg-zinc-50': type === 'muted',
        }
      )}
    >
      <div className="p-4">
        <div className="flex items-start">
          {icons[type] && <div className="shrink-0">{icons[type]}</div>}
          <div className="ml-3 flex-1">
            <h3
              className={clsx('text-sm font-bold', {
                'text-yellow-800': type === 'warning',
                'text-green-800': type === 'success',
                'text-red-800': type === 'error',
                'text-blue-800': type === 'info',
                'text-zinc-800': type === 'muted',
              })}
            >
              {title}
            </h3>
            <div
              className={clsx('mt-2 text-sm', {
                'text-yellow-700 a:hover:text-yellow-800': type === 'warning',
                'text-green-700 a:hover:text-green-800': type === 'success',
                'text-red-700 a:hover:text-red-800': type === 'error',
                'text-blue-700 a:hover:text-blue-800': type === 'info',
                'text-zinc-700 a:hover:text-zinc-800': type === 'muted',
              })}
            >
              <p
                className={clsx('[&_a]:underline', {
                  '[&_a:hover]:text-yellow-9700': type === 'warning',
                  '[&_a:hover]:text-green-900': type === 'success',
                  '[&_a:hover]:text-red-900': type === 'error',
                  '[&_a:hover]:text-blue-900': type === 'info',
                  '[&_a:hover]:text-zinc-900': type === 'muted',
                })}
                dangerouslySetInnerHTML={{ __html: text }}
              ></p>
            </div>
          </div>

          {setShow && (
            <div className="ml-4 flex shrink-0">
              <button
                type="button"
                onClick={() => selectedTab === 'archivados' ? setIsOpen(true) : setShow(false)}
                className="cursor-pointer inline-flex rounded-md text-zinc-400 hover:text-zinc-500 focus:outline-2 focus:outline-offset-2 focus:outline-zinc-600 dark:hover:text-white dark:focus:outline-zinc-500"
              >
                <span className="sr-only">Cerrar</span>
                <XMarkIcon
                  aria-hidden="true"
                  className="size-5 hover:text-zinc-700"
                />
              </button>
              {selectedTab === 'archivados' && 
              <Alert open={isOpen} onClose={setIsOpen}>
                <AlertTitle>
                  Estas seguro que quieres eliminar este mensaje?
                </AlertTitle>
                <AlertDescription>
                  Los mensajes se eliminarán permanentemente y no se podrán
                  recuperar
                </AlertDescription>
                <AlertActions>
                  <Button
                    plain
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => setShow(false)}
                    className="cursor-pointer"
                  >
                    Borrar
                  </Button>
                </AlertActions>
              </Alert>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
