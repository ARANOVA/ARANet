'use client';

import { ExclamationTriangleIcon } from '@heroicons/react/16/solid';
import { Alert, AlertActions, AlertTitle, Button } from '../../tw';
import { FormUi, SingleResponse } from '../../../interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  title: string;
  idField?: string;
  model?: string;
  deleteFn: (model: string, ids: number[]) => Promise<SingleResponse<void>>;
  ui: FormUi;
}
export const FormAlert = ({ title, idField, model, deleteFn, ui }: Props) => {
  if (!ui.openedAlert) return null;

  const queryClient = useQueryClient();

  const mutation = useMutation<SingleResponse<void>, Error, number[]>({
    mutationFn: (ids) => {
      if (!model) throw new Error('Model is required for deletion');
      if (!Array.isArray(ids)) {
        ids = [ids];
      }
      return deleteFn(model, ids);
    },
    onSuccess: (data) => {
      if (data.statusCode < 300) {
        ui.closeAlert();
        queryClient.invalidateQueries({ queryKey: [model] });
        ui.setToastProps({
          type: 'success',
          title: '¡Conseguido!',
          subtitle: `Regitro eliminado`,
        });
      } else {
        ui.setToastProps({
          type: 'error',
          title: '¡Algo fué mal!',
          subtitle: `No se pudo eliminar el registro`,
        });
      }
      ui.showToast(3000);
    },
    onError: (error) => {
      ui.setToastProps({
        type: 'warning',
        title: '¡Algo fué mal!',
        subtitle: `No se pudo eliminar el registro`,
      });
      ui.showToast(3000);
    },
  });
  
  const handleDelete = (ids: number) => {
    mutation.mutate([ids]);
    return mutation.isSuccess;
  };

  return (
    <Alert open={ui.openedAlert} onClose={ui.closeAlert} size="lg">
      <AlertTitle className="justify-self-center">{title}</AlertTitle>
      <AlertActions className="justify-self-center">
        <Button plain onClick={() => ui.closeAlert()}>
          Cancelar
        </Button>
        <Button
          color="red"
          onClick={() => {
            handleDelete(ui.selectedItem[idField || 'id']);
          }}
        >
          <ExclamationTriangleIcon />
          Aceptar
        </Button>
      </AlertActions>
    </Alert>
  );
};
