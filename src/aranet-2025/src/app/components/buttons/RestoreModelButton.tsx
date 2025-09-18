'use client';

import { useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert, AlertActions, AlertTitle, Button, SingleResponse } from "@aranova/aranova-react-ui";
import { restoreDataByModel } from "@/app/lib/api-wrappers/client";
import { logError } from "@/app/lib/logger";
import { useFormUiStore, useItemsStore } from "@/store";
import { useRouter } from "next/navigation";

interface Props {
    model: string;
    id?: number;
}

export const RestoreModelButton = ({ model, id }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    setItems,
    resetItems,
    getItems,
  } = useItemsStore();

  const { setToastProps, showToast, closeAlert } = useFormUiStore();

  // Delete/Batch
  const [nbrestored, setNbrestored] = useState<number>(id !== undefined ? 1 : getItems(model).length);

  // // Modal (delete row)
  const restoreFn = (
    model: string,
    ids: number[]
  ): Promise<SingleResponse<void>> => {
    closeAlert();
    return restoreDataByModel(model, ids);
  };

  const mutation = useMutation<SingleResponse<void>, Error, number[]>({
    mutationFn: ids => {
      if (!Array.isArray(ids)) {
        ids = [ids];
      }
      return restoreFn(model, ids);
    },
    onSuccess: data => {
      if (data.statusCode < 300) {
        setItems([]);
        resetItems(model, []);
        queryClient.invalidateQueries({ queryKey: [model] });
        setIsOpen(false);
        setToastProps({
          type: 'success',
          title: '¡Conseguido!',
          subtitle: nbrestored === 1 ? 'Registro restaurado' : `${nbrestored} Registros restaurados`,
        });
        showToast(3000);
        // Invalidar y redirigir
        queryClient.invalidateQueries({ queryKey: [model, id] });
        router.push(`/${model}/show/${id}`);
      } else {
        setIsOpen(false);
        setToastProps({
          type: 'error',
          title: 'Algo fué mal!',
          subtitle: nbrestored === 1 ? `No se pudo restaurar el registro` : `No se pudieron restaurar todos los registros`,
        });
        showToast(3000);
      }
    },
    onError: error => {
      logError(`Error restoring ${model}: ${error}`)
      setIsOpen(false);
      setToastProps({
        type: 'warning',
        title: 'Algo fué mal!',
        subtitle: nbrestored === 1 ? `No se pudo restaurar el registro` : `No se pudieron restaurar ${nbrestored} registro(s)`,
      });
      showToast(3000);
    },
  });

  const wrapperRestoreFn = (
    ids: number[] | number
  ): Promise<boolean> | boolean => {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }
    setNbrestored(ids.length);
    mutation.mutate(ids);
    return mutation.isSuccess;
  };
  
  // () => wrapperDeleteFn(id !== undefined ? [id] : getItems(model).map(e => e.id as number))}
  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer"
        color="green"
      >
        Restaurar
      </Button>
      <Alert open={isOpen} onClose={setIsOpen} size="lg">
        <AlertTitle className="justify-self-center">
          ¿Estás seguro que quieres restaurar el elemento?
        </AlertTitle>
        <AlertActions className="justify-self-center">
          <Button plain onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button
            color="green"
            onClick={() => {
              wrapperRestoreFn(id !== undefined ? [id] : getItems(model).map(e => e.id as number))
            }}
          >
            <ExclamationTriangleIcon />
            Aceptar
          </Button>
        </AlertActions>
      </Alert>
    </>
  )
}