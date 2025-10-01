'use client';

import { aranet_invoice_verifactu } from "@/interfaces";
import { useFormUiStore } from "@/store";
import { Alert, AlertActions, AlertTitle, Button } from "@aranova/aranova-react-ui";
import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";


interface Props {
  data: aranet_invoice_verifactu;
}

export const SendInvoiceButton = ({ data }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { setToastProps, showToast, closeAlert } = useFormUiStore();

  const wrapperSendFn = (
  ): Promise<boolean> | boolean => {
    closeAlert();
    setIsOpen(false);
    setToastProps({
      type: 'success',
      title: '¡Conseguido!',
      subtitle: 'Factura enviada a correctamente. No se podrá alterar.',
    });
    showToast(3000);
    console.log({data})
    return true;
  };
  
  // () => wrapperDeleteFn(id !== undefined ? [id] : getItems(model).map(e => e.id as number))}
  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer"
        color="amber"
      >
        Alta Verifactu
      </Button>
      <Alert open={isOpen} onClose={setIsOpen} size="lg">
        <AlertTitle className="justify-self-center">
          ¿Estás seguro que quieres registrar la factura?
        </AlertTitle>
        <AlertActions className="justify-self-center">
          <Button plain onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button
            color="amber"
            onClick={wrapperSendFn}
          >
            <ExclamationTriangleIcon />
            Aceptar
          </Button>
        </AlertActions>
      </Alert>
    </>
  )
}
