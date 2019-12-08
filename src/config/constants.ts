import environments from './environments';

// Inicializar variables de entorno
if (process.env.NODE_ENV !== 'production') {
    // Inicializar variables de entorno
    const environment = environments;

}

export const SECRET_KEY = process.env.SECRET || 'AnartzMugika';

export const JWT_VERIFY_FAILED = 'La autenticación del token es inválida. Por favor, inicia sesión para obtener un nuevo token';