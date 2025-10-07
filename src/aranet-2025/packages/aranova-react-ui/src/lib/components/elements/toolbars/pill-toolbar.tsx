'use client';

interface Pill {
  title: string;
  context: any;
}

interface Props {
  pills: Pill[];
  setActivePills: (pills: Pill[]) => void;
}

export const PillToolbar = ({ pills, setActivePills }: Props) => {
  const setFilterField = (activePill: Pill) => {
    const activePills = pills.filter(f => f.title !== activePill.title);
    setActivePills(activePills);
  };

  return (
    <div className="pt-1 sm:mt-0 hidden md:block">
      <div className="-m-1 flex flex-wrap items-center">
        {pills.map(activePill => (
          <span
            key={activePill.title}
            className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-zinc-200 dark:border-gray-400 dark:bg-zinc-400 py-1.5 pr-2 pl-3 text-xs font-medium text-gray-900"
          >
            <span>{activePill.title}</span>
            <button
              onClick={() => setFilterField(activePill)}
              type="button"
              className="ml-1 inline-flex size-4 shrink-0 rounded-full p-1 text-gray-700 hover:bg-gray-200 hover:text-gray-500"
            >
              <span className="sr-only">
                Remove pill for {activePill.title}
              </span>
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 8 8"
                className="size-2"
              >
                <path
                  d="M1 1l6 6m0-6L1 7"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
