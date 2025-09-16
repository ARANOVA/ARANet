'use client';

import React, { useState } from 'react';
import {
  Button,
  Field,
  Input,
  Label,
  Switch,
  TextLink,
  Fieldset,
  NotificationAlert,
} from '@aranova/aranova-react-ui';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getErrorMessage } from '@/app/lib/helpers/errors';
import { loginAuth } from '@/app/lib/auth';
import { EyeSlashIcon } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/outline';
import { logDebug, logError } from '@/app/lib/logger';

interface Props {
  referer?: string;
}

export const Login = ({ referer }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      let redirectUrl = '';
      // Aquí se crea la sesión
      const user = await loginAuth(
        username,
        username,
        password,
        remember
      );
      if (typeof user !== 'string') {
        logDebug(`User ${username} logged in successfully`);
        redirectUrl = !referer || referer.indexOf('login') > -1 ? '' : referer;
        router.push(redirectUrl);
      } else {
        throw Error(user);
      }
    } catch (error) {
      logError(
        `User ${username} fail to login. ${getErrorMessage(error)}`
      );
      // setError(getErrorMessage(error));
      setError('No pudo loguearse. Comprueba tus datos de acceso');
    }
  };

  return (
    <div className="dark:bg-zinc-800 bg-zinc-200 p-10 rounded-none md:rounded-xl">
      <form className="w-full max-w-sm space-y-8" onSubmit={handleLogin}>
        <div className="flex justify-center">
          <Image
            src={process.env.APP_LOGO_LIGHT || ''}
            alt="Logo"
            width={282}
            height={80}
            priority={true}
            className="hidden dark:block object-contain"
          />

          {/* Logo para tema oscuro */}
          <Image
            src={process.env.APP_LOGO_DARK || ''}
            alt="Logo"
            width={282}
            height={80}
            priority={true}
            className="block dark:hidden object-contain"
          />
        </div>
        <NotificationAlert
          title="¡Algo fué mal!"
          text={error}
        ></NotificationAlert>
        <Fieldset>
          <Field className="mt-4">
            <Label
              className="text-base font-bold text-zinc-950 select-none sm:text-sm dark:text-white"
              htmlFor="dni"
            >
              Usuario o Email
            </Label>
            <div className="relative">
              <Input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="current-username"
                placeholder="Introduce tu nombre de usuario o email"
                className="block appearance-none rounded-lg w-full text-zinc-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </Field>

          <Field className="mt-4">
            <Label
              className="text-base font-bold text-zinc-950 select-none sm:text-sm dark:text-white"
              htmlFor="password"
            >
              Contraseña
            </Label>

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Introduce tu contraseña"
                className=" block appearance-none rounded-lg w-full  text-zinc-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm"
              />

              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400"
                aria-label={
                  showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                }
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </Field>

          <div className="flex flex-wrap justify-between gap-2 mt-6">
            <Field className="flex items-center gap-4">
              <Switch
                name="allow_embedding"
                className="bg-zinc-500"
                checked={remember}
                onChange={setRemember}
              />
              <Label className="font-medium">Recuérdame</Label>
            </Field>
            <TextLink
              className=" text-sm self-center font-semibold text-zinc-950 hover:text-zinc-500 dark:text-gray-400 dark:hover:text-zinc-300 no-underline"
              href="#"
            >
              ¿Has olvidado tu contraseña?
            </TextLink>
          </div>

          <Button
            type="submit"
            className="mt-4 w-full inline-flex items-center justify-center gap-x-2 rounded-lg border text-base font-semibold sm:text-sm focus:outline-hidden data-focus:outline-2 data-focus:outline-blue-500 cursor-pointer bg-zinc-100 dark:bg-zinc-600 text-gray-900 dark:text-white border-transparent transition duration-200 hover:bg-zinc-800 dark:hover:bg-zinc-500"
          >
            Acceder
          </Button>
        </Fieldset>
      </form>
    </div>
  );
};
