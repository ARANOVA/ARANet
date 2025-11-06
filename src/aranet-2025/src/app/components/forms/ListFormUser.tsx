"use client";

import { useEffect, useState } from "react";
import { useFormUiStore } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NewUserForm from "./NewUserForm";
import UserEditForm from "./UserEditForm";
import { useSaveMutation, useUser } from "@/app/data/ClientDataPlain";
import {
  UserFormDataDTO,
  UserInsertFormDataDTO,
} from "@/app/data/user/zodDataUser";
import { SingleResponse } from "@aranova/aranova-react-ui";
import { updateDataByModelGraphql } from "@/app/lib/api-wrappers/client";
import { ToastStoreAlert } from '@/app/components';

export const ListFormUser = () => {
  const model = "user";
  const {
    closeDrawer,
    selectedItem,
    pageDataSelectedForm,
    setToastProps,
    showToast,
  } = useFormUiStore();
  const queryClient = useQueryClient();

  const [currentUser, setCurrentUser] = useState<UserFormDataDTO | null>(null);

  let id: number;
  if (Array.isArray(selectedItem)) {
    id = selectedItem[pageDataSelectedForm].id as number;
  } else {
    id = selectedItem.id as number;
  }

  const { data, isLoading, isError } = useUser(id);

  useEffect(() => {
    if (data) {
      setCurrentUser(data ?? null);
    }
  }, [data]);

  const mutation = useSaveMutation('user', id);

  const onSubmit = (data: UserInsertFormDataDTO) => {
    console.log("data del onsubmit", data);
    mutation.mutate(data);
  };

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar el empleado</p>;
  if (!selectedItem) return <p>Selecciona al menos un empleado</p>;

  return (
    <section className="w-full">
      {currentUser ? (
        <>
        <ToastStoreAlert />
          <UserEditForm defaultValues={currentUser} onSubmit={onSubmit} />
        </>
      ) : (
        <>
          <NewUserForm onSubmit={onSubmit}/>
        </>
      )}
    </section>
  );
};
