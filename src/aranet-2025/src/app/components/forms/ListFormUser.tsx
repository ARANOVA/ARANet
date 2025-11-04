'use client';

import { useEffect, useState } from 'react';
import { useFormUiStore } from '@/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import NewUserForm from './NewUserForm';
import { getUserById } from '@/app/lib/api-wrappers/server';
import UserEditForm from './UserEditForm';
import { getSingleDataByModelGraphql } from '@/app/lib/api-wrappers/client';
import { useUser } from '@/app/data/ClientDataPlain';


export const ListFormUser = () => {
  const model = 'plantilla';
  const { closeDrawer, selectedItem, pageDataSelectedForm, setToastProps, showToast } =
    useFormUiStore();
  const queryClient = useQueryClient();

  const [currentUser, setCurrentUser] =
    useState< any | null>(null);

    console.log('selected item: ', selectedItem);

  let id: number;
  if (Array.isArray(selectedItem)) {

    id = selectedItem[pageDataSelectedForm].id as number;
  } else {

    id = selectedItem.id as number;
  }

  console.log('id de usuario: ',id);

  const { data, isLoading, isError } = useUser(id);

  console.log('data de usuario: ',data);

  useEffect(() => {
    if (data) {
      setCurrentUser(data.data ?? null);
  
    }
  }, [data]);
    console.log({currentUser})

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar el empleado</p>;
  if (!selectedItem) return <p>Selecciona al menos un empleado</p>;

  return (
    <section className="w-full">
      {currentUser ? (
        <>
        <UserEditForm defaultValues={currentUser}/>
        </>
      ) : (
        <>
          <NewUserForm  />
        </>
      )}
    </section>
  );
};
