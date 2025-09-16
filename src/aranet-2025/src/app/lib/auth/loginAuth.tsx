'use client';

import { SingleResponse } from '@aranova/aranova-react-ui';
import { logError } from '../logger';

export const loginAuth = async (
  email: string,
  username: string,
  password: string,
  remember: boolean,
): Promise<{ email: string; username: string;} | string> => {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password, remember }),
      credentials: 'include', // Asegura que las cookies se envían con la solicitud
    });

    let data: SingleResponse<unknown> | null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (res.ok) {
      return { username, email }; // Login exitoso
    } else {
      return data?.error || 'Error desconocido'; // Maneja errores del backend
    }
  } catch (err) {
    logError(`Error loginAuth: ${err}`);
    return 'Error de red o servidor'; // Maneja errores de fetch
  }
};