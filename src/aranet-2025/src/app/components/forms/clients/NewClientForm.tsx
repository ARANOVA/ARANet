"use client";

import {
  Button,
  Field,
  Input,
  Label,
  Textarea,
  Select,
} from "@aranova/aranova-react-ui";
import { Controller, useForm } from "react-hook-form";
import { useFormUiStore } from "@/store";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Kind_of_company } from "@/interfaces";
import { wrapGetListDataByModelGraphql } from "@/app/data/ClientDataPlain";
import { ClientFormDataDTO, ClientInsertFormDataDTO, clientSchemaInsert } from "@/app/data/client/zodDataClient";

interface Props {
  onSubmit: (data: ClientInsertFormDataDTO) => void;
}

export default function NewClientForm({ onSubmit }: Props) {
  const { modeForm, setToastProps, showToast, hideToast } = useFormUiStore();

  const [kinds, setKinds] = useState<Kind_of_company[]>([]);

  useEffect(() => {
    const fetchKinds = async () => {
      try {
        const response = await wrapGetListDataByModelGraphql<Kind_of_company>(
          "kind_of_company"
        );
        setKinds(response?.data?.items ?? []);
      } catch (error) {
        console.error("Error al obtener tipos de compañía:", error);
      }
    };
    fetchKinds();
  }, []);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<ClientFormDataDTO>({
    resolver: zodResolver(clientSchemaInsert),
    defaultValues: {
      client_unique_name: "",
      client_company_name: "",
      client_cif: "",
      client_kind_of_company_id: 0,
      client_since: undefined,
      client_website: "",
      client_comments: "",
      client_has_tags: 0,
    },
  });

  useEffect(() => {
    if (isSubmitted && Object.keys(errors).length > 0) {
      setToastProps({
        type: "warning",
        title: "Campos inválidos",
        subtitle: "Revisa los campos resaltados e intenta de nuevo",
      });
      showToast(3000);
    }
  }, [isSubmitted, errors]);

  useEffect(() => {
    hideToast();
  }, []);

  const submitForm = (data: ClientFormDataDTO) => {
    (data as any).created_at = new Date();
    (data as any).created_by = 1;
    const formData: ClientInsertFormDataDTO = clientSchemaInsert.parse(data);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6 mt-5">
      {/* Client unique name */}
      <Field>
        <Label htmlFor="client_unique_name" data-obligatorio>
          Nombre único del cliente
        </Label>
        <Input
          id="client_unique_name"
          placeholder="Introduce el nombre único"
          {...register("client_unique_name", { required: "Campo obligatorio" })}
          disabled={isSubmitting}
        />
        {errors.client_unique_name && (
          <p className="text-red-600 text-sm mt-1">
            {errors.client_unique_name.message}
          </p>
        )}
      </Field>

      {/* Client company name */}
      <Field>
        <Label htmlFor="client_company_name" data-obligatorio>
          Nombre de la empresa
        </Label>
        <Input
          id="client_company_name"
          placeholder="Introduce el nombre de la empresa"
          {...register("client_company_name", { required: "Campo obligatorio" })}
          disabled={isSubmitting}
        />
        {errors.client_company_name && (
          <p className="text-red-600 text-sm mt-1">
            {errors.client_company_name.message}
          </p>
        )}
      </Field>

      {/* Client CIF */}
      <Field>
        <Label htmlFor="client_cif">CIF / NIF</Label>
        <Input
          id="client_cif"
          placeholder="Introduce el CIF/NIF"
          {...register("client_cif")}
          disabled={isSubmitting}
        />
        {errors.client_cif && (
          <p className="text-red-600 text-sm mt-1">{errors.client_cif.message}</p>
        )}
      </Field>

      {/* Client kind of company */}
      <Field>
        <Label htmlFor="client_kind_of_company_id">Tipo de empresa</Label>
        <Controller
          name="client_kind_of_company_id"
          control={control}
          render={({ field }) => (
            <Select {...field} disabled={isSubmitting}>
              <option hidden value={0}>
                Selecciona
              </option>
              {kinds.map((kind) => (
                <option key={kind.id} value={kind.id}>
                  {kind.kind_of_company_title}
                </option>
              ))}
            </Select>
          )}
        />
      </Field>

      {/* Client since */}
      <Field>
        <Label htmlFor="client_since">Desde</Label>
        <Input
          id="client_since"
          type="date"
          {...register("client_since")}
          disabled={isSubmitting || modeForm === "show"}
        />
      </Field>

      {/* Client website */}
      <Field>
        <Label htmlFor="client_website">Website</Label>
        <Input
          id="client_website"
          placeholder="Introduce la web"
          {...register("client_website")}
          disabled={isSubmitting}
        />
      </Field>

      {/* Client comments */}
      <Field>
        <Label htmlFor="client_comments">Comentarios</Label>
        <Textarea
          id="client_comments"
          placeholder="Comentarios"
          {...register("client_comments")}
          disabled={isSubmitting}
        />
      </Field>

      {/* Client has tags */}
      <Field>
        <Label htmlFor="client_has_tags">Tags</Label>
        <Input
          id="client_has_tags"
          type="number"
          placeholder="Introduce el número de tags"
          {...register("client_has_tags")}
          disabled={isSubmitting}
        />
      </Field>

      <div className="flex justify-center my-10">
        <Button type="submit" disabled={isSubmitting}>
          Guardar
        </Button>
      </div>
    </form>
  );
}
