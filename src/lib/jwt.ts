import { SECRET_KEY, JWT_VERIFY_FAILED } from './../config/constants';
import jwt from 'jsonwebtoken';

class JWT {
    secretKey = SECRET_KEY;
    /**
     * Firma del token
     * @param user información del usuario
     * @param expireTime Tiempo (en sg) para caducidad del token. Por defecto 24 horas. Usamos HORAS / MINUTOS / SEGUNDOS
     */
    sign(user: any, expireTime: number = 24 * 60 * 60): string {
        // Borrar la información del password
        delete user.password;
        return jwt.sign({ user }, this.secretKey, { expiresIn: expireTime});
    }

    /**
     * 
     * @param token Token para autenticar nuestra sesión
     */
    verify(token: string): string {
        try {
            return jwt.verify(token, this.secretKey) as string;
        } catch (e) {
            return JWT_VERIFY_FAILED;
        }
    }
}

export default JWT;