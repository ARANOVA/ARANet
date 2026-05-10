import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { MenuItem } from '../../interfaces';
import clsx from 'clsx';

interface Props {
  links?: MenuItem[];
  className?: string;
}

export function TopBreadcrumb({ links, className }: Props) {
  return (
    <div className={clsx(className || '', 'print:hidden max-lg:hidden mb-4')}>
      {(links ?? []).map((link, index) => {
          if (link.href !== null) {
            return (
              <Link
                key={index}
                href={ link.href }
                className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
              >
                <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
                { link.name }
              </Link>
            )
           } else {
            return (
              <div
                key={index}
                className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
              >
                <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
                { link.name }
              </div>
            )
          }
        }
      )}
    </div>
  );
}
