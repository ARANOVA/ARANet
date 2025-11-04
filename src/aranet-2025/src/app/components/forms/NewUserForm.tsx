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
  Listbox,
  ListboxOption,
  TabMenu,
  Checkbox,
} from "@aranova/aranova-react-ui";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import { useFormUiStore } from "@/store";

export default function NewUserForm() {
  const { modeForm } = useFormUiStore();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const tabs: TabMenu[] = [
    { key: "Usuario", label: "Crear usuario" },
    { key: "Perfil", label: "Perfil usuario" },
  ];

  const onSubmit = (data: any) => {
    console.log("Datos enviados:", data);
  };

  const tabClassName =
    "rounded-lg cursor-pointer px-3 py-2 text-sm font-semibold text-white data-selected:bg-white/10";

  return (
    <form className="space-y-6 mt-5" onSubmit={handleSubmit(onSubmit)}>
      <TabGroup>
        <TabList className="flex gap-4 overflow-x-auto pb-4">
          {tabs.map(({ key, label }) => (
            <Tab key={key} className={tabClassName}>
              {label}
            </Tab>
          ))}
        </TabList>

        <Divider className="my-4" />

        <TabPanels className="mt-3">
          {/* 🧍‍♂️ USUARIO */}
          <TabPanel key="Usuario">
            <Fieldset className="grid grid-cols-1 md:grid-cols-8 gap-6">
              <Field className="col-span-full md:col-span-4">
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
                    Introduce un nombre de usuario
                  </p>
                )}
              </Field>

           

              <Field className="col-span-full md:col-span-4">
                <Label htmlFor="password" data-obligatorio>
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", { required: "Campo obligatorio" })}
                  disabled={isSubmitting || modeForm === "show"}
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    Introduce una contraseña
                  </p>
                )}
              </Field>

              <Field className="col-span-full md:col-span-4">
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
                      value={value}
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
              </Field>

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
                        checked={field.value}
                        className="ml-2"
                        onChange={field.onChange}
                        disabled={isSubmitting || modeForm === "show"}
                      />
                    )}
                  />
                </div>
              </Field>
              <Field className="col-span-full md:col-span-2 flex items-center gap-2">
                <div>
                  <Label htmlFor="is_super_admin" className="text-sm font-medium">
                    Usuario administrador
                  </Label>
                  <Controller
                    name="is_super_admin"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Usuario administrador"
                        checked={field.value}
                        className="ml-2"
                        onChange={field.onChange}
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
            <Fieldset className="grid grid-cols-1 md:grid-cols-8 gap-6">
              {/* Nombre */}
              <Field className="col-span-4 flex items-center gap-2">
                <div className="flex-1">
                  <Label htmlFor="first_name">Nombre</Label>
                  <Controller
                    name="public_first_name"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        className="ml-3"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                      />
                    )}
                  />

                  <Input
                    id="first_name"
                    {...register("first_name")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                </div>
              </Field>

              {/* Apellidos */}
              <Field className="col-span-4 flex items-center gap-2">
                <div className="flex-1">
                  <Label htmlFor="last_name">Apellidos</Label>
                  <Controller
                    name="public_last_name"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        className="ml-3"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                      />
                    )}
                  />

                  <Input
                    id="last_name"
                    {...register("last_name")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                </div>
              </Field>

              {/* Género */}
              <Field className="col-span-4">
                <Label>Género</Label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value?.toString() || ""}
                      onChange={field.onChange}
                      disabled={isSubmitting || modeForm === "show"}
                      className="flex gap-4"
                    >
                      <RadioField>
                        <Radio value="1" id="masculino" />
                        <Label htmlFor="masculino">Masculino</Label>
                      </RadioField>
                      <RadioField>
                        <Radio value="2" id="femenino" />
                        <Label htmlFor="femenino">Femenino</Label>
                      </RadioField>
                      <RadioField>
                        <Radio value="0" id="otro" />
                        <Label htmlFor="otro">Otro</Label>
                      </RadioField>
                      <RadioField></RadioField>
                    </RadioGroup>
                  )}
                />
              </Field>

              {/* Email */}
              <Field className="col-span-full md:col-span-4">
                <Label htmlFor="email" data-obligatorio>
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { required: "Campo obligatorio" })}
                  disabled={isSubmitting || modeForm === "show"}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    Introduce un correo electrónico válido
                  </p>
                )}
              </Field>

                   {/* CIF */}
                   <Field className="col-span-4 flex items-center gap-2">
                <div className="flex-1">
                  <Label htmlFor="cif">CIF</Label>
                  <Controller
                    name="public_cif"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        className="ml-3"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                      />
                    )}
                  />

                  <Input
                    id="cif"
                    {...register("cif")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                </div>
              </Field>

              {/* Fecha nacimiento */}
              <Field className="col-span-4 flex items-center gap-2">
                <div className="flex-1">
                  <Label htmlFor="birthday">Fecha de nacimiento</Label>
                  <Controller
                    name="public_birthday"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        className="ml-3"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                      />
                    )}
                  />

                  <Input
                    id="birthday"
                    type="date"
                    {...register("birthday")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                </div>
              </Field>

              {/* Teléfono 1 */}
              <Field className="col-span-4 flex items-center gap-2">
                <div className="flex-1">
                  <Label htmlFor="phone1">Teléfono 1</Label>
                  <Controller
                    name="public_phone1"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        className="ml-3"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                      />
                    )}
                  />

                  <Input
                    id="phone1"
                    {...register("phone1")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                </div>
              </Field>
              {/* Teléfono 2 */}
              <Field className="col-span-4 flex items-center gap-2">
                <div className="flex-1">
                  <Label htmlFor="phone2">Teléfono 2</Label>
                  <Controller
                    name="public_phone2"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        className="ml-3 justify-between"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                      />
                    )}
                  />

                  <Input
                    id="phone2"
                    {...register("phone2")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                </div>
              </Field>
            </Fieldset>
            <Divider className="w-full mt-5 mb-5" />
            <Fieldset className="grid grid-cols-1 md:grid-cols-8 gap-6">
              {/* Calle */}
              <Field className="col-span-4 flex items-center gap-2">
                <div className="flex-1">
                  <Label htmlFor="street">Calle</Label>
                  <Controller
                    name="public_street"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        className="ml-2"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                      />
                    )}
                  />

                  <Input
                    id="street"
                    {...register("street")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                </div>
              </Field>
              {/* Estado */}
              <Field className="col-span-4 flex items-center gap-2">
                <div className="flex-1">
                  <Label htmlFor="state">Estado </Label>
                  <Controller
                    name="public_state"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        className="ml-3"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                      />
                    )}
                  />

                  <Input
                    id="state"
                    {...register("state")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                </div>
              </Field>
              {/* Pais */}
              <Field className="col-span-4 flex items-center gap-2">
                <div className="flex-1">
                  <Label htmlFor="country">Pais </Label>
                  <Controller
                    name="public_country"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        className="ml-3"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                      />
                    )}
                  />

                  <Input
                    id="country"
                    {...register("country")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                </div>
              </Field>

              {/* Ciudad */}
              <Field className="col-span-4 flex items-center gap-2">
                <div className="flex-1">
                  <Label htmlFor="city">Ciudad</Label>
                  <Controller
                    name="public_city"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        className="ml-3"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                      />
                    )}
                  />

                  <Input
                    id="city"
                    {...register("city")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                </div>
              </Field>

              {/* Empresa */}
              <Field className="col-span-4 flex items-center gap-2">
                <div className="flex-1">
                  <Label htmlFor="company">Empresa</Label>
                  <Controller
                    name="public_company"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        title="Hacer público"
                        className="ml-3"
                        checked={!!field.value}
                        onChange={(v) => field.onChange(v ? 1 : 0)}
                      />
                    )}
                  />

                  <Input
                    id="company"
                    {...register("company")}
                    disabled={isSubmitting || modeForm === "show"}
                  />
                </div>
              </Field>

         
            </Fieldset>
          </TabPanel>
        </TabPanels>
      </TabGroup>

      <div className="flex justify-center my-10">
        <Button className="w-[30%]" type="submit">
          Guardar
        </Button>
      </div>
    </form>
  );
}
