'use client';

import { useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert, AlertActions, AlertTitle, Button, SingleResponse } from "@aranova/aranova-react-ui";
import { logError } from "@/app/lib/logger";
import { useFormUiStore, useItemsStore } from "@/store";
import { useRouter } from "next/navigation";
import { deleteDataByModelGraphql } from "@/app/lib/api-wrappers/client";

interface Props {
    model: string;
    id?: number;
}

export const DeleteModelButton = ({ model, id }: Props) => {
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
  const [nbdeleted, setNbdeleted] = useState<number>(id !== undefined ? 1 : getItems(model).length);

  // // Modal (delete row)
  const deleteFn = (
    model: string,
    ids: number[]
  ): Promise<SingleResponse<void>> => {
    closeAlert();
    return deleteDataByModelGraphql(model, ids);
  };

  const mutation = useMutation<SingleResponse<void>, Error, number[]>({
    mutationFn: ids => {
      if (!Array.isArray(ids)) {
        ids = [ids];
      }
      return deleteFn(model, ids);
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
          subtitle: nbdeleted === 1 ? 'Registro eliminado' : `${nbdeleted} Registros eliminados`,
        });
        showToast(3000);
        // Invalidar y redirigir
        queryClient.invalidateQueries({ queryKey: [model, id] });
        router.push(`/${model}/list`);
      } else {
        setIsOpen(false);
        setToastProps({
          type: 'error',
          title: 'Algo fué mal!',
          subtitle: nbdeleted === 1 ? `No se pudo eliminar el registro` : `No se pudieron eliminar todos los registros`,
        });
        showToast(3000);
      }
    },
    onError: error => {
      logError(`Error deleting ${model}: ${error}`)
      setIsOpen(false);
      setToastProps({
        type: 'warning',
        title: 'Algo fué mal!',
        subtitle: nbdeleted === 1 ? `No se pudo eliminar el registro` : `No se pudieron eliminar ${nbdeleted} registro(s)`,
      });
      showToast(3000);
    },
  });

  const wrapperDeleteFn = (
    ids: number[] | number
  ): Promise<boolean> | boolean => {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }
    setNbdeleted(ids.length);
    mutation.mutate(ids);
    return mutation.isSuccess;
  };
  
  // () => wrapperDeleteFn(id !== undefined ? [id] : getItems(model).map(e => e.id as number))}
  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer"
        color="red"
      >
        Borrar
      </Button>
      <Alert open={isOpen} onClose={setIsOpen} size="lg">
        <AlertTitle className="justify-self-center">
          ¿Estás seguro que quieres eliminar los elementos seleccionados?
        </AlertTitle>
        <AlertActions className="justify-self-center">
          <Button plain onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button
            color="red"
            onClick={() => {
              wrapperDeleteFn(id !== undefined ? [id] : getItems(model).map(e => e.id as number))
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