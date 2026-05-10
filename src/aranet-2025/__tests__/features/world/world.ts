import { World, setWorldConstructor } from '@cucumber/cucumber';

/**
 * Define la interfaz para el contexto compartido (World) en cada escenario.
 * Todos los datos que necesites pasar entre pasos (e.g., la respuesta, la cookie, datos de formulario)
 * deben ser propiedades de esta clase.
 */
export interface CustomWorld extends World {
  browser: any;
  page: any;
  context: any;

  // Propiedades de la respuesta API (heredadas de la versión anterior)
  loginResponse: Response | null;
  sessionCookie: string | null;

  // Nuevas propiedades para la lógica de los Steps (Simulación de entrada de usuario)
  currentUserDni: string | null;
  currentPassword: string | null;

  // Propiedades para simular el estado de la UI / Sesión
  errorMessageVisible: boolean;
  isAdmin: boolean;
  isLoggedIn: boolean;
  baseURL: string;
}

/**
 * Clase constructora que inicializa el contexto del World.
 * Siempre debe inicializar las propiedades compartidas.
 */
class CustomWorldConstructor implements CustomWorld {
  // Propiedades requeridas por la interfaz World
  [key: string]: any;

  browser: any;
  page: any;
  context: any;

  // Propiedades de nuestro contexto personalizado (Estado)
  loginResponse: Response | null;
  sessionCookie: string | null;

  currentUserDni: string | null;
  currentPassword: string | null;

  errorMessageVisible: boolean;
  isAdmin: boolean;
  isLoggedIn: boolean;

  attach: any;
  log: any;
  link: any;
  parameters: any;
  baseURL = 'http://localhost:3000';

  constructor(options: any) {
    // Inicialización de propiedades
    this.loginResponse = null;
    this.sessionCookie = null;
    this.currentUserDni = null;
    this.currentPassword = null;
    this.errorMessageVisible = false;
    this.isAdmin = false;
    this.isLoggedIn = false;
  }
}

// Registramos el constructor de nuestro World personalizado
setWorldConstructor(CustomWorldConstructor);
