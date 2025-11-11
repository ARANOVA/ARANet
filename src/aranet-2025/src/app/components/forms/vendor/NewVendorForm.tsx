"use client";

import {
  Button,
  Divider,
  Field,
  Fieldset,
  Input,
  Label,
  Radio,
  RadioField,
  RadioGroup,
  Textarea,
  Checkbox,
  Select,
} from "@aranova/aranova-react-ui";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import { useFormUiStore } from "@/store";
import {
  UserFormDataDTO,
  UserInsertFormDataDTO,
  userSchemaInsert,
} from "@/app/data/user/zodDataUser";
import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ToastStoreAlert } from "../..";
import {
  VendorFormDataDTO,
  VendorInsertFormDataDTO,
  vendorSchemaInsert,
} from "@/app/data/vendor/zodDataVendor";

interface Props {
  onSubmit: (data: VendorInsertFormDataDTO) => void;
}

export default function NewVendorForm({ onSubmit }: Props) {
  const { modeForm, setToastProps, showToast, hideToast } = useFormUiStore();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<VendorFormDataDTO>({
    resolver: zodResolver(vendorSchemaInsert as any),
    defaultValues: {
      id: 0,
      vendor_unique_name: "",
      vendor_company_name: "",
      vendor_cif: "",
      vendor_kind_of_company_id: 0,
      vendor_since: undefined,
      vendor_website: "",
      vendor_comments: "",
      vendor_has_tags: 0,
      created_at: undefined,
      created_by: 0,
      updated_at: undefined,
      updated_by: 0,
      deleted_at: undefined,
      deleted_by: 0,
      vendor_company_type: 0,
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

  const submitForm = (data: VendorFormDataDTO) => {
    (data as any).created_at = new Date();
    const formData: VendorInsertFormDataDTO = vendorSchemaInsert.parse(data);
    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6 mt-5">
      <ToastStoreAlert />

      {/* Vendor unique name */}
      <Field>
        <Label htmlFor="vendor_unique_name" data-obligatorio>
          Nombre único del proveedor
        </Label>
        <Input
          id="vendor_unique_name"
          placeholder="Introduce el nombre único"
          {...register("vendor_unique_name", { required: "Campo obligatorio" })}
          disabled={isSubmitting}
        />
        {errors.vendor_unique_name && (
          <p className="text-red-600 text-sm mt-1">
            {errors.vendor_unique_name.message}
          </p>
        )}
      </Field>

      {/* Vendor company name */}
      <Field>
        <Label htmlFor="vendor_company_name" data-obligatorio>
          Nombre de la empresa
        </Label>
        <Input
          id="vendor_company_name"
          placeholder="Introduce el nombre de la empresa"
          {...register("vendor_company_name", {
            required: "Campo obligatorio",
          })}
          disabled={isSubmitting}
        />
        {errors.vendor_company_name && (
          <p className="text-red-600 text-sm mt-1">
            {errors.vendor_company_name.message}
          </p>
        )}
      </Field>

      {/* Vendor CIF */}
      <Field>
        <Label htmlFor="vendor_cif">CIF / NIF</Label>
        <Input
          id="vendor_cif"
          placeholder="Introduce el CIF/NIF"
          {...register("vendor_cif")}
          disabled={isSubmitting}
        />
      </Field>

      {/* Vendor kind of company */}
      <Field>
        <Label htmlFor="vendor_kind_of_company_id">Tipo de empresa</Label>
        <Controller
          name="vendor_kind_of_company_id"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              disabled={isSubmitting}
            >
              <option value={0}>Selecciona un tipo</option>
              {/* Aquí deberías mapear los tipos de empresa desde tu API */}
            </Select>
          )}
        />
      </Field>

      {/* Since */}
      <Field className="col-span-4 relative">
        <Label htmlFor="vendor_since">Desde</Label>
        <Input
          id="vendor_since"
          type="date"
          {...register("vendor_since")}
          disabled={isSubmitting || modeForm === "show"}
        />
      </Field>

      {/* Vendor website */}
      <Field>
        <Label htmlFor="vendor_website">Website</Label>
        <Input
          id="vendor_website"
          placeholder="Introduce la web"
          {...register("vendor_website")}
          disabled={isSubmitting}
        />
      </Field>

      {/* Vendor comments */}
      <Field>
        <Label htmlFor="vendor_comments">Comentarios</Label>
        <Textarea
          id="vendor_comments"
          placeholder="Comentarios"
          {...register("vendor_comments")}
          disabled={isSubmitting}
        />
      </Field>
      {/* Tags */}
      <Field>
        <Label htmlFor="vendor_has_tags">Tags</Label>
        <Input
          id="vendor_has_tags"
          type="number"
          placeholder="Introduce el número de tags"
          {...register("vendor_has_tags")}
          disabled={isSubmitting}
        />
      </Field>
      {/* Vendor type of company */}
      <Field>
        <Label htmlFor="vendor_company_type">Tipo de compañía / negocio</Label>
        <Controller
          name="vendor_company_type"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              disabled={isSubmitting}
            >
              <option value={0}>Selecciona un tipo</option>
              <option value={1}>tipo 0</option>
              <option value={2}>tipo 1</option>
            </Select>
          )}
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
