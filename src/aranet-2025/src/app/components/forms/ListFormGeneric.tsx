"use client";

import { useEffect, useState, ComponentType } from "react";
import { useFormUiStore } from "@/store";
import { ToastStoreAlert } from "@/app/components";
import { useSaveMutation } from "@/app/data/ClientDataPlain";
import { ZodSchema } from "zod";
import { userSchema } from "@/app/data/user/zodDataUser";
import { vendorSchema } from "@/app/data/vendor/zodDataVendor";
import { clientSchema } from "@/app/data/client/zodDataClient";

interface ListFormGenericProps<TData, TInsert> {
  model: string;
  useGetHook: (model:string, id: number,zodSchema: ZodSchema<any>) => { data?: TData; isLoading: boolean; isError: boolean };
  EditForm: ComponentType<{ defaultValues: TData; onSubmit: (data: TInsert) => void }>;
  NewForm: ComponentType<{ onSubmit: (data: TInsert) => void }>;
}

export function ListFormGeneric<TData, TInsert>({
  model,
  useGetHook,
  EditForm,
  NewForm,
}: ListFormGenericProps<TData, TInsert>) {
  const { selectedItem, pageDataSelectedForm } = useFormUiStore();

  const [currentData, setCurrentData] = useState<TData | null>(null);

  let id: number | null = null;
  if (selectedItem) {
    id = Array.isArray(selectedItem)
      ? selectedItem[pageDataSelectedForm]?.id
      : selectedItem.id;
  }

  const map: Record<string, ZodSchema<any>> = { 
    user: userSchema,
    vendor:vendorSchema,
    client:clientSchema,

  };

  const { data, isLoading, isError } = id ? useGetHook(model, id, map[model]) : { data: null, isLoading: false, isError: false };

  console.log('data del getHook',data)
  useEffect(() => {
    if (data) setCurrentData(data ?? null);
  }, [data]);

  const mutation = useSaveMutation(model, id || undefined);

  const onSubmit = (formData: TInsert) => {
    mutation.mutate(formData);
  };

  if (!selectedItem) return <p>Selecciona al menos un elemento</p>;
  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar los datos</p>;

  return (
    <section className="w-full">
      <ToastStoreAlert />
      {currentData ? (
        <EditForm defaultValues={currentData} onSubmit={onSubmit} />
      ) : (
        <NewForm onSubmit={onSubmit} />
      )}
    </section>
  );
}
