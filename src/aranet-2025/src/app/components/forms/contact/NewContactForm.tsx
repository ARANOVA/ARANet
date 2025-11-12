"use client";

import {
  Button,
  Field,
  Input,
  Label,
} from "@aranova/aranova-react-ui";
import { Controller, useForm } from "react-hook-form";
import { useFormUiStore } from "@/store";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactFormDataDTO,
  ContactInsertFormDataDTO,
  contactSchemaInsert,
} from "@/app/data/contact/zodDataContact";

interface Props {
  onSubmit: (data: ContactInsertFormDataDTO) => void;
}

export default function NewContactForm({ onSubmit }: Props) {
  const { modeForm, setToastProps, showToast, hideToast } = useFormUiStore();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<ContactFormDataDTO>({
    resolver: zodResolver(contactSchemaInsert as any),
    defaultValues: {
      contact_salutation: "",
      contact_first_name: "",
      contact_last_name: "",
      contact_email: "",
      contact_phone: "",
      contact_fax: "",
      contact_mobile: "",
      contact_birthday: null,
      contact_org_unit: "",
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

  const submitForm = (data: ContactFormDataDTO) => {
    (data as any).created_at = new Date();
    (data as any).created_by = 1;
    const formData: ContactInsertFormDataDTO = contactSchemaInsert.parse(data);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6 mt-5">
      {/* Salutation */}
      <Field>
        <Label htmlFor="contact_salutation">Saludo</Label>
        <Input
          id="contact_salutation"
          placeholder="Sr./Sra."
          {...register("contact_salutation")}
          disabled={isSubmitting}
        />
      </Field>

      {/* First name */}
      <Field>
        <Label htmlFor="contact_first_name" data-obligatorio>
          Nombre
        </Label>
        <Input
          id="contact_first_name"
          placeholder="Introduce el nombre"
          {...register("contact_first_name", { required: "Campo obligatorio" })}
          disabled={isSubmitting}
        />
        {errors.contact_first_name && (
          <p className="text-red-600 text-sm mt-1">{errors.contact_first_name.message}</p>
        )}
      </Field>

      {/* Last name */}
      <Field>
        <Label htmlFor="contact_last_name" data-obligatorio>
          Apellido
        </Label>
        <Input
          id="contact_last_name"
          placeholder="Introduce el apellido"
          {...register("contact_last_name", { required: "Campo obligatorio" })}
          disabled={isSubmitting}
        />
        {errors.contact_last_name && (
          <p className="text-red-600 text-sm mt-1">{errors.contact_last_name.message}</p>
        )}
      </Field>

      {/* Email */}
      <Field>
        <Label htmlFor="contact_email" data-obligatorio>
          Email
        </Label>
        <Input
          id="contact_email"
          type="email"
          placeholder="Introduce el email"
          {...register("contact_email", { required: "Campo obligatorio" })}
          disabled={isSubmitting}
        />
        {errors.contact_email && (
          <p className="text-red-600 text-sm mt-1">{errors.contact_email.message}</p>
        )}
      </Field>

      {/* Phone */}
      <Field>
        <Label htmlFor="contact_phone">Teléfono</Label>
        <Input
          id="contact_phone"
          placeholder="Introduce el teléfono"
          {...register("contact_phone")}
          disabled={isSubmitting}
        />
      </Field>

      {/* Fax */}
      <Field>
        <Label htmlFor="contact_fax">Fax</Label>
        <Input
          id="contact_fax"
          placeholder="Introduce el fax"
          {...register("contact_fax")}
          disabled={isSubmitting}
        />
      </Field>

      {/* Mobile */}
      <Field>
        <Label htmlFor="contact_mobile">Móvil</Label>
        <Input
          id="contact_mobile"
          placeholder="Introduce el móvil"
          {...register("contact_mobile")}
          disabled={isSubmitting}
        />
      </Field>

      {/* Birthday */}
      <Field>
        <Label htmlFor="contact_birthday">Fecha de nacimiento</Label>
        <Input
          id="contact_birthday"
          type="date"
          {...register("contact_birthday")}
          disabled={isSubmitting || modeForm === "show"}
        />
      </Field>

      {/* Organization Unit */}
      <Field>
        <Label htmlFor="contact_org_unit">Unidad organizativa</Label>
        <Input
          id="contact_org_unit"
          placeholder="Departamento"
          {...register("contact_org_unit")}
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
