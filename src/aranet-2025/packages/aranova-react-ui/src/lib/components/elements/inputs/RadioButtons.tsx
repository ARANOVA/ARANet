
interface Props<T> {
  onChange: (value: T | T[]) => void;
  options: T[];
  displayValue?: (value: T | T[] | null) => string | undefined;
  valueFn?: (value: T | T[] | null) => string | undefined;
  selected?: T | T[];
  required: boolean;
  multiple?: boolean;
  disabled?:boolean;
}

export const RadioButtons = <T extends string | number | object>({
  options,
  onChange,
  valueFn,
  displayValue,
  selected,
  required,
  multiple = false,
  disabled = false,
}: Props<T>) => {

  const isSelected = (option: T) => {
    const optionVal = valueFn ? valueFn(option) : JSON.stringify(option);
  
    if (multiple && Array.isArray(selected)) {
      return selected.some((item) => {
        const selectedVal = valueFn ? valueFn(item) : JSON.stringify(item);
        return selectedVal === optionVal;
      });
    } else if (!multiple && selected) {
      const selectedVal = valueFn ? valueFn(selected) : JSON.stringify(selected);
      return selectedVal === optionVal;
    }
  
    return false;
  };
  

  const handleClick = (option: T) => {
    if (multiple) {
      const newSelection = Array.isArray(selected)
        ? selected.includes(option)
          ? selected.filter((item) => item !== option)
          : [...selected, option]
        : [option];
      onChange(newSelection as T[]);
    } else {
      onChange(option as T);
    }
  };


  const defValueFn = (value: unknown): string => {
    return Array.isArray(value) ? value.join(", ") : (value || '') as string;
  };

  const defDisplayValue = (value: unknown): string => {
    return Array.isArray(value) ? value.join(", ") : (value || '') as string;
  };

  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      {options.map((option, idx) => (
        <button
        disabled={disabled}
          key={idx}
          type="button"
          value={valueFn ? valueFn(option) : defValueFn(option)}
          onClick={() => handleClick(option)}
          className={`px-3 py-1 cursor-pointer text-sm font-medium border border-zinc-300 dark:border-zinc-700
          ${
            isSelected(option)
              ? 'bg-blue-600 text-white'
              : 'bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-zinc-500 dark:text-white dark:hover:bg-zinc-600'
          }
          ${
            option === options[0]
              ? 'rounded-l-md'
              : option === options[options.length - 1]
              ? 'rounded-r-md'
              : ''
          } 
          disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {displayValue ? displayValue(option) : defDisplayValue(option)}
        </button>
      ))}
    </div>
  );
};
