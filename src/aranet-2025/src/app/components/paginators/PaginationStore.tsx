'use client';

import { useFormUiStore } from "@/store";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export const PaginationStore = () => {

    const { selectedItem,setPageDataSelectedForm, pageDataSelectedForm } = useFormUiStore();
    if(selectedItem.length === 1 || !selectedItem.length){
        return '';
    }

    const IncrementIndex = () => {
        if (pageDataSelectedForm < selectedItem.length - 1) 
        setPageDataSelectedForm(pageDataSelectedForm + 1);
    };

    const restIndex = () => {
        if (pageDataSelectedForm > 0) 
        setPageDataSelectedForm(pageDataSelectedForm - 1);
    };
    return (
        <div className="flex justify-center items-center self-end gap-4 whitespace-nowrap">
            <ChevronLeftIcon width={35} height={35} onClick={restIndex} className={pageDataSelectedForm === 0 ? 'disabled dark:text-zinc-600 text-zinc-200' : 'rounded-lg hover:dark:bg-zinc-600 hover:bg-zinc-300 text-zinc-700 dark:text-white cursor-pointer'} />
            <span className='font-bold text-zinc-700 dark:text-white'>{pageDataSelectedForm + 1} / {selectedItem.length}</span>
            <ChevronRightIcon width={35} height={35} onClick={IncrementIndex} className={pageDataSelectedForm === (selectedItem.length -1) ? 'disabled dark:text-zinc-600 text-zinc-200' : 'rounded-lg hover:dark:bg-zinc-600 hover:bg-zinc-300  text-zinc-700 dark:text-white cursor-pointer'} />
        </div>
    );
}