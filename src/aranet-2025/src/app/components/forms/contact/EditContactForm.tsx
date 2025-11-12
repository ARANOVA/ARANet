"use client";

import {
  Button,
  Field,
  Input,
  Label,
} from "@aranova/aranova-react-ui";
import { useForm } from "react-hook-form";
import { useFormUiStore } from "@/store";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactFormDataDTO,
  ContactInsertFormDataDTO,
  contactSchemaInsert,
} from "@/app/data/contact/zodDataContact";

interface Props {
  defaultValues: ContactFormDataDTO;
  onSubmit: (data: ContactInsertFormDataDTO) => void;
}

export default function EditContactForm({ defaultValues, onSubmit }: Props) {
  const { modeForm, setToastProps, showToast, hideToast } = useFormUiStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<ContactFormDataDTO>({
    resolver: zodResolver(contactSchemaInsert as any),
    defaultValues,
  });

  useEffect(() => {
    console.log(errors)
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
    (data as any).updated_at = new Date();
    (data as any).updated_by = 1;
    const formData: ContactInsertFormDataDTO = contactSchemaInsert.parse(data);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6 mt-5">
      <Field>
        <Label htmlFor="contact_salutation">Saludo</Label>
        <Input
          id="contact_salutation"
          {...register("contact_salutation")}
           disabled={isSubmitting || modeForm === "show"}
        />
      </Field>

      <Field>
        <Label htmlFor="contact_first_name" data-obligatorio>
          Nombre
        </Label>
        <Input
          id="contact_first_name"
          {...register("contact_first_name", { required: "Campo obligatorio" })}
           disabled={isSubmitting || modeForm === "show"}
        />
        {errors.contact_first_name && (
          <p className="text-red-600 text-sm mt-1">{errors.contact_first_name.message}</p>
        )}
      </Field>

      <Field>
        <Label htmlFor="contact_last_name" data-obligatorio>
          Apellido
        </Label>
        <Input
          id="contact_last_name"
          {...register("contact_last_name", { required: "Campo obligatorio" })}
           disabled={isSubmitting || modeForm === "show"}
        />
        {errors.contact_last_name && (
          <p className="text-red-600 text-sm mt-1">{errors.contact_last_name.message}</p>
        )}
      </Field>

      <Field>
        <Label htmlFor="contact_email" data-obligatorio>
          Email
        </Label>
        <Input
          id="contact_email"
          type="email"
          {...register("contact_email", { required: "Campo obligatorio" })}
           disabled={isSubmitting || modeForm === "show"}
        />
        {errors.contact_email && (
          <p className="text-red-600 text-sm mt-1">{errors.contact_email.message}</p>
        )}
      </Field>

      <Field>
        <Label htmlFor="contact_phone">Teléfono</Label>
        <Input id="contact_phone" {...register("contact_phone")}  disabled={isSubmitting || modeForm === "show"} />
      </Field>

      <Field>
        <Label htmlFor="contact_fax">Fax</Label>
        <Input id="contact_fax" {...register("contact_fax")}  disabled={isSubmitting || modeForm === "show"} />
      </Field>

      <Field>
        <Label htmlFor="contact_mobile">Móvil</Label>
        <Input id="contact_mobile" {...register("contact_mobile")}  disabled={isSubmitting || modeForm === "show"} />
      </Field>

      <Field>
        <Label htmlFor="contact_birthday">Fecha de nacimiento</Label>
        <Input
          id="contact_birthday"
          type="date"
          {...register("contact_birthday")}
          disabled={isSubmitting || modeForm === "show"}
        />
      </Field>

      <Field>
        <Label htmlFor="contact_org_unit">Unidad organizativa</Label>
        <Input id="contact_org_unit" {...register("contact_org_unit")}  disabled={isSubmitting || modeForm === "show"} />
      </Field>

      <div className="flex justify-center my-10">
        {modeForm === "edit" &&
        <Button type="submit"  disabled={isSubmitting}>
          Guardar
        </Button>
        }
      </div>
    </form>
  );
}
