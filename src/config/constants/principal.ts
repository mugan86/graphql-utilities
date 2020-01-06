import environments from '../environments';

// Inicializar variables de entorno cuando no esté en producción
if (process.env.NODE_ENV !== 'production') {
   // Inicializar variables de entorno
   const environment = environments;
}
export const SECRET_KEY = process.env.SECRET || 'AnartzMugika';


export const COLLECTIONS = {
    USERS: 'users'
}