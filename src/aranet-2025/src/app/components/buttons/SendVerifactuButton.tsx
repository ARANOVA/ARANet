'use client';

import { refreshPage } from "@/app/actions";
import { updateDataByModelGraphql } from "@/app/lib/api-wrappers/client";
import { logError } from "@/app/lib/logger";
import { aranet_invoice_verifactu } from "@/interfaces";
import { useFormUiStore } from "@/store";
import { Alert, AlertActions, AlertTitle, Button, SingleResponse } from "@aranova/aranova-react-ui";
import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface Props {
  data: aranet_invoice_verifactu;
}

export const SendInvoiceButton = ({ data }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const model = 'invoice';
  const id = data.id;

  const queryClient = useQueryClient();

  const { setToastProps, showToast, closeAlert } = useFormUiStore();

  // Modal (delete row)
  const sendVerifactuFn = (
    id: number,
  ): Promise<SingleResponse<void>> => {
    closeAlert();
    setIsOpen(false);
    const data = {
      freeze_at: new Date().toISOString(),
      signed_at: new Date().toISOString(),
      sent_at: new Date().toISOString(),
      sent_hash: 'xxxx-xxxx-xxxx-xxxx',
    }
    return updateDataByModelGraphql(model, id, data);
  };
  
  const mutation = useMutation<SingleResponse<void>, Error, number>({
    mutationFn: id => {
      return sendVerifactuFn(id);
    },
    onSuccess: data => {
      if (data.statusCode < 300) {
        setIsOpen(false);
        setToastProps({
          type: 'success',
          title: '¡Conseguido!',
          subtitle: 'Factura enviada a correctamente. No se podrá alterar.',
        });
        showToast(3000);
        // Invalidar y redirigir
        queryClient.invalidateQueries({ queryKey: [model, id] })
          .then(() => refreshPage(`/${model}/show/${id}`))
          .then(() => refreshPage(`/${model}/edit/${id}`))
          .then(() => refreshPage(`/${model}/list`))
          .then(() => router.refresh());
      } else {
        setIsOpen(false);
        setToastProps({
          type: 'error',
          title: '¡Algo fué mal!',
          subtitle: `No se pudo enviar la factura a Verifactu`,
        });
        showToast(3000);
      }
    },
    onError: error => {
      logError(`Error sending ${model}/${id}: ${error}`)
      setIsOpen(false);
      setToastProps({
        type: 'warning',
        title: '¡Algo fué mal!',
        subtitle: `No se pudo enviar la factura a Verifactu`,
      });
      showToast(3000);
    },
  });
  
  const wrapperSendFn = (id: number): Promise<boolean> | boolean => {
    mutation.mutate(id);
    return mutation.isSuccess;
  };

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
            onClick={() => wrapperSendFn(id)}
          >
            <ExclamationTriangleIcon />
            Aceptar
          </Button>
        </AlertActions>
      </Alert>
    </>
  )
}
