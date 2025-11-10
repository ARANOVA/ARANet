"use client";

import {
  Button,
  Divider,
  Field,
  Fieldset,
  Input,
  Label,
  Checkbox,
  RadioGroup,
  Radio,
  RadioField,
} from "@aranova/aranova-react-ui";
import { useForm, Controller } from "react-hook-form";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useFormUiStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Textarea } from "@aranova/aranova-react-ui";

import {
  UserFormDataDTO,
  UserInsertFormDataDTO,
  userSchemaInsert,
} from "@/app/data/user/zodDataUser";
import { ToastStoreAlert } from "..";

interface Props {
  defaultValues: UserFormDataDTO;
  onSubmit: (data: UserInsertFormDataDTO) => void;
}

export default function UserEditForm({ defaultValues, onSubmit }: Props) {
  const { modeForm, setToastProps, showToast, hideToast } = useFormUiStore();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting,isSubmitted },
  } = useForm<UserFormDataDTO>({
    defaultValues,
    resolver: zodResolver(userSchemaInsert as any),
  });

  const tabs = useMemo(
    () => [
      { key: "Usuario", label: "Datos de usuario" },
      { key: "Perfil", label: "Perfil del usuario" },
    ],
    []
  );
  useEffect(() => {
    hideToast()
  }, []);

  useEffect(() => {
    if (isSubmitted && Object.keys(errors).length > 0) {
      console.log('errores: ', errors)
      setToastProps({
        type: "warning",
        title: "Campos inválidos",
        subtitle: "Revisa los campos resaltados e intenta de nuevo",
      });
      showToast(3000);
    }
  }, [isSubmitted, errors]);

  const tabClassName =
    "rounded-lg cursor-pointer px-3 py-2 text-sm font-semibold text-white data-selected:bg-white/10";

  const submitForm = (data: UserFormDataDTO) => {
    delete (data as any).id;
    delete (data as any).profile.id;
    delete (data as any).profile.user_id;
    const formData: UserInsertFormDataDTO = userSchemaInsert.parse(data);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-6 mt-5">
      {/* <ToastStoreAlert /> */}
      <TabGroup>
        <TabList className="flex gap-4 overflow-x-auto pb-4">
          {tabs.map(({ key, label }) => (
            <Tab key={key} className={tabClassName}>
              {label}
            </Tab>
          ))}
        </TabList>

        <Divider className="my-4" />

        <TabPanels>
          {/* 🧍 DATOS DE USUARIO */}
          <TabPanel key="Usuario">
            <Fieldset className="grid grid-cols-1 md:grid-cols-8 gap-6">
              {/* Username */}
              <Field className="col-span-4 relative">
                <Label htmlFor="username" data-obligatorio>
                  Nombre de usuario
                </Label>
                <Input
                  id="username"
                  {...register("username", { required: "Campo obligatorio" })}
                  disabled={isSubmitting || modeForm === "show"}
                />
                {errors.username && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </Field>

              {/* Password
              <Field className="col-span-4">
                <Label htmlFor="password" data-obligatorio>
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  defaultValue={""}
                  {...register("password", { required: "Campo obligatorio" })}
                  disabled={isSubmitting || modeForm === "show"}
                />
              </Field> */}

              {/* Roles */}
              {/* <Field className="col-span-4">
                <Label htmlFor="roles" data-obligatorio>
                  Roles
                </Label>
                <Controller
                  name="roles"
                  control={control}
                  defaultValue={[]}
                  render={({ field: { value, onChange } }) => (
                    <Listbox
                      multiple
                      value={value || []}
                      onChange={onChange}
                      placeholder="Selecciona roles"
                      disabled={isSubmitting || modeForm === "show"}
                    >
                      {["ROLE_ADMIN", "ROLE_USER", "ROLE_MANAGER"].map(
                        (role) => (
                          <ListboxOption key={role} value={role}>
                            {role}
                          </ListboxOption>
                        )
                      )}
                    </Listbox>
                  )}
                />
              </Field> */}
              <Field className="col-span-full md:col-span-2 flex items-center gap-2">
                <div>
                  <Label htmlFor="is_active" className="text-sm font-medium">
                    Usuario activo
                  </Label>
                  <Controller
                    name="is_active"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Usuario activo"
                        checked={!!field.value}
                        className="ml-2"
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                        disabled={isSubmitting || modeForm === "show"}
                      />
                    )}
                  />
                </div>
              </Field>
              <Field className="col-span-full md:col-span-2 flex items-center gap-2">
                <div>
                  <Label
                    htmlFor="is_super_admin"
                    className="text-sm font-medium"
                  >
                    Usuario administrador
                  </Label>
                  <Controller
                    name="is_super_admin"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Usuario administrador"
                        checked={!!field.value}
                        className="ml-2"
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                        disabled={isSubmitting || modeForm === "show"}
                      />
                    )}
                  />
                </div>
              </Field>
            </Fieldset>
          </TabPanel>

          {/* 👤 PERFIL */}
          <TabPanel key="Perfil">
            <div className="w-full flex justify-center p-5">
              <h1 className="text-lg font-semibold text-center">
                DATOS PERSONALES / EMPRESA
              </h1>
            </div>
            <Fieldset className="grid grid-cols-1 md:grid-cols-8 gap-6">
              {/* Título */}
              <Field className="col-span-4 relative">
                <Label htmlFor="first_name">Título</Label>
                <div className="flex">
                  <Input
                    id="title"
                    placeholder="Introduce un tiítulo"
                    {...register("profile.title")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                  <Controller
                    name="profile.public_title"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                        className=" items-center ml-2"
                        disabled={isSubmitting || modeForm === "show"}
                      />
                    )}
                  />
                </div>
              </Field>
              {/* Nombre */}
              <Field className="col-span-4 relative">
                <Label htmlFor="first_name">Nombre</Label>
                <div className="flex">
                  <Input
                    id="first_name"
                    placeholder="Introduce tu nombre"
                    {...register("profile.first_name")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                  <Controller
                    name="profile.public_first_name"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                        className=" items-center ml-2"
                        disabled={isSubmitting || modeForm === "show"}
                      />
                    )}
                  />
                </div>
              </Field>

              {/* Apellidos */}
              <Field className="col-span-4 relative">
                <Label htmlFor="last_name">Apellidos</Label>
                <div className="flex">
                  <Input
                    id="last_name"
                    placeholder="Introduce tus apellidos"
                    {...register("profile.last_name")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                  <Controller
                    name="profile.public_last_name"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                        className=" items-center ml-2"
                        disabled={isSubmitting || modeForm === "show"}
                      />
                    )}
                  />
                </div>
              </Field>

              {/* Género */}
              <Field className="col-span-4">
                <Label>Género</Label>
                <Controller
                  name="profile.gender"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value?.toString()}
                      onChange={(v) => field.onChange(parseInt(v))}
                      className="flex gap-4"
                      disabled={isSubmitting || modeForm === "show"}
                    >
                      <RadioField>
                        <Radio value="0" id="otro" />
                        <Label htmlFor="otro">Otro</Label>
                      </RadioField>
                      <RadioField>
                        <Radio value="1" id="femenino" />
                        <Label htmlFor="femenino">Femenino</Label>
                      </RadioField>
                      <RadioField>
                        <Radio value="2" id="masculino" />
                        <Label htmlFor="masculino">Masculino</Label>
                      </RadioField>
                      <RadioField></RadioField>
                    </RadioGroup>
                  )}
                />
              </Field>

              {/* Email */}
              <Field className="col-span-4 relative">
                <Label htmlFor="email" data-obligatorio>
                  Correo electrónico
                </Label>
                <div className="flex">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Introduce un correo electrónico"
                    {...register("profile.email", {
                      required: "Campo obligatorio",
                    })}
                    disabled={isSubmitting || modeForm === "show"}
                  />

                  <Controller
                    name="profile.public_email"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        className=" items-center ml-2"
                        title="Hacer público"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                        disabled={isSubmitting || modeForm === "show"}
                      />
                    )}
                  />
                </div>
                {errors.profile?.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.profile.email.message}
                  </p>
                )}
              </Field>

              {/* URL */}
              <Field className="col-span-4 relative">
                <Label htmlFor="url">URL</Label>
                <div className="flex">
                  <Input
                    id="url"
                    type="url"
                    placeholder="Introduce una url"
                    {...register("profile.url")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                  <Controller
                    name="profile.public_url"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                        className=" items-center ml-2"
                        disabled={isSubmitting || modeForm === "show"}
                      />
                    )}
                  />
                </div>
              </Field>

              {/* OPENID URL */}
              <Field className="col-span-4 relative">
                <Label htmlFor="openid_url">OpenID URL</Label>
                <div className="flex">
                  <Input
                    id="openid_url"
                    type="url"
                    placeholder="Introduce tu URL de OpenID"
                    {...register("profile.openid_url")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                </div>
              </Field>

              {/* CIF */}
              <Field className="col-span-4 relative">
                <Label htmlFor="cif">CIF / NIF</Label>
                <div className="flex">
                  <Input
                    id="cif"
                    placeholder="Introduce el CIF / NIF | DNI / NIE"
                    {...register("profile.cif")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                  <Controller
                    name="profile.public_cif"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                        className=" items-center ml-2"
                        disabled={isSubmitting || modeForm === "show"}
                      />
                    )}
                  />
                </div>
              </Field>
              {/* Empresa */}
              <Field className="col-span-4 relative">
                <Label htmlFor="company">Empresa</Label>
                <div className="flex">
                  <Input
                    id="company"
                    placeholder="Introduce el nombre de empresa"
                    {...register("profile.company")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                  <Controller
                    name="profile.public_company"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        className=" items-center ml-2"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                        disabled={isSubmitting || modeForm === "show"}
                      />
                    )}
                  />
                </div>
              </Field>

              {/* Fecha nacimiento */}
              <Field className="col-span-4 relative">
                <Label htmlFor="birthday">Fecha de nacimiento</Label>

                <div className="flex">
                  <Input
                    id="birthday"
                    type="date"
                    {...register("profile.birthday")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                  <Controller
                    name="profile.public_birthday"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        className=" items-center ml-2"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                        disabled={isSubmitting || modeForm === "show"}
                      />
                    )}
                  />
                </div>
              </Field>

              {/* Teléfono 1 */}
              <Field className="col-span-4 relative">
                <Label htmlFor="phone1">Teléfono 1</Label>
                <div className="flex">
                  <Input
                    id="phone1"
                    type="tel"
                    placeholder="Introduce un número de teléfono"
                    {...register("profile.phone1")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                  <Controller
                    name="profile.public_phone1"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                        className=" items-center ml-2"
                        disabled={isSubmitting || modeForm === "show"}
                      />
                    )}
                  />
                </div>
              </Field>

              {/* Teléfono 2 */}
              <Field className="col-span-4 relative">
                <Label htmlFor="phone1">Teléfono 2</Label>
                <div className="flex">
                  <Input
                    id="phone2"
                    type="tel"
                    placeholder="Introduce un número de teléfono"
                    {...register("profile.phone2")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                  <Controller
                    name="profile.public_phone2"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                        className=" items-center ml-2"
                        disabled={isSubmitting || modeForm === "show"}
                      />
                    )}
                  />
                </div>
              </Field>
              {/* fax */}
              <Field className="col-span-4 relative">
                <Label htmlFor="fax">Fax</Label>
                <div className="flex">
                  <Input
                    id="fax"
                    placeholder="Introduce un número de fax"
                    {...register("profile.fax")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                  <Controller
                    name="profile.public_fax"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                        className=" items-center ml-2"
                        disabled={isSubmitting || modeForm === "show"}
                      />
                    )}
                  />
                </div>
              </Field>
              {/* Notas */}
              <Field className="col-span-4 relative">
                <Label htmlFor="notes">Notas</Label>
                <div className="flex items-start">
                  <Textarea
                    id="notes"
                    placeholder="Introduce alguna nota o comentario"
                    {...register("profile.notes")}
                    disabled={isSubmitting || modeForm === "show"}
                    className="flex-1"
                    rows={3}
                  />
                </div>
              </Field>
            </Fieldset>
            <Divider className="w-full mt-5 mb-5" />
            <div className="w-full flex justify-center p-5">
              <h1 className="text-lg font-semibold text-center">DIRECCIÓN</h1>
            </div>
            <Fieldset className="grid grid-cols-1 md:grid-cols-8 gap-6">
              {/* País */}
              <Field className="col-span-4 relative">
                <Label htmlFor="country">País</Label>
                <div className="flex">
                  <Input
                    id="country"
                    placeholder="Introduce el país"
                    {...register("profile.country")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                  <Controller
                    name="profile.public_country"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        className=" items-center ml-2"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                        disabled={isSubmitting || modeForm === "show"}
                      />
                    )}
                  />
                </div>
                {errors.profile?.country && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.profile?.country.message}
                  </p>
                )}
              </Field>

              {/* Estado */}
              <Field className="col-span-4 relative">
                <Label htmlFor="state">Estado / Provincia</Label>
                <div className="flex">
                  <Input
                    id="state"
                    placeholder="Introduce el estado/provincia"
                    {...register("profile.state")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                  <Controller
                    name="profile.public_state"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        className=" items-center ml-2"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                        disabled={isSubmitting || modeForm === "show"}
                      />
                    )}
                  />
                </div>
              </Field>

              {/* Ciudad */}
              <Field className="col-span-4 relative">
                <Label htmlFor="city">Ciudad</Label>
                <div className="flex">
                  <Input
                    id="city"
                    placeholder="Introduce la ciudad"
                    {...register("profile.city")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                  <Controller
                    name="profile.public_city"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        className=" items-center ml-2"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                        disabled={isSubmitting || modeForm === "show"}
                      />
                    )}
                  />
                </div>
              </Field>

              {/* Calle */}
              <Field className="col-span-4 relative">
                <Label htmlFor="street">Calle</Label>
                <div className="flex">
                  <Input
                    id="street"
                    placeholder="Introduce la calle"
                    {...register("profile.street")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                  <Controller
                    name="profile.public_street"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        className=" items-center ml-2"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                        disabled={isSubmitting || modeForm === "show"}
                      />
                    )}
                  />
                </div>
              </Field>
              {/* code */}
              <Field className="col-span-4 relative">
                <Label htmlFor="code">Código postal</Label>
                <div className="flex">
                  <Input
                    id="code"
                    placeholder="Introduce el código postal"
                    {...register("profile.code")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                  <Controller
                    name="profile.public_code"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        className=" items-center ml-2"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                        disabled={isSubmitting || modeForm === "show"}
                      />
                    )}
                  />
                </div>
              </Field>
            </Fieldset>
          </TabPanel>
        </TabPanels>
      </TabGroup>

      <div className="flex justify-center my-10">
        <Button
          type="submit"
          className="w-[30%] cursor-pointer"
          disabled={isSubmitting}
        >
          Guardar
        </Button>
      </div>
    </form>
  );
}
