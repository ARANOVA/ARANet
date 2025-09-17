'use client';

import { useFormUiStore } from '@/store/form-ui.store';
import { ToastAlert } from '@aranova/aranova-react-ui';

export const ToastStoreAlert = () => {
  const { toastProps, showedToast, hideToast } = useFormUiStore();

  return (
    <ToastAlert showedToast={showedToast} toastProps={toastProps} hideToast={hideToast} />
  );
};
