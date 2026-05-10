'use client';

import { BellAlertIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

interface Props {
    nbMessages: number;
}

export const NotificationMenuIcon = ({ nbMessages }: Props) => {
  const [nbMessagesState, setNbMessagesState] = useState<number>(nbMessages || 0);

  return (
    <>
      <BellAlertIcon />
      <span className="font-bold text-md">
        {nbMessagesState > 0 ? `(${nbMessagesState < 10 ? nbMessagesState : '+10'})` : ''}
        {''}
      </span>
    </>
  );
};
