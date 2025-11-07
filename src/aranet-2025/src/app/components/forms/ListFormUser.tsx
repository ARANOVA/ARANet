"use client";

import { useEffect, useState } from "react";
import { useFormUiStore } from "@/store";
import NewUserForm from "./NewUserForm";
import UserEditForm from "./UserEditForm";
import { useSaveMutation, useUser } from "@/app/data/ClientDataPlain";
import {
  UserFormDataDTO,
  UserInsertFormDataDTO,
} from "@/app/data/user/zodDataUser";
import { ToastStoreAlert } from '@/app/components';

export const ListFormUser = () => {
  const {
    selectedItem,
    pageDataSelectedForm,
  } = useFormUiStore();

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
