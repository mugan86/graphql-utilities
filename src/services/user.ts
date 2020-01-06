import { JWT_MESSAGES } from './../config/constants/messages';
import { encriptPassword, passwordAccessCheck } from './../lib/password';
import DatabaseOperations from "./db-operations";
import { COLLECTIONS } from "./../config/constants/principal";
import JWT from "./../lib/jwt";
import { resultMessages } from './../lib/utils';

class UserService {
    database: DatabaseOperations;
    collection: string = COLLECTIONS.USERS;
    constructor(database?: any) {
        this.database = new DatabaseOperations(database);
    }

    private registerFail = (message: string) => {
        return { status: false, message, user: null}
    }

    async login(email: string, password: string) {
        return await this.database.findOne(this.collection, { email }).
            then(async (result: any) => {
                if (result !== null) {
                    if (!passwordAccessCheck(password, result.password)) {
                        return resultMessages({
                            token: null,
                            message: 'Credenciales introducidas incorrectas'
                        }, 'token');
                    }

                    return {
                        status: true,
                        message: `El usuario ${result.name} ${result.lastname} ha iniciado sesión correctamente`,
                        token: new JWT().sign(result)
                    }
                }
                return {
                    status: false,
                    message: 'El usuario con el que quieres iniciar sesión no existe',
                    token: null
                }

            }).
            catch((_: any) => {
                return {
                    status: false,
                    message: 'Error inesperado, no se ha podido iniciar sesión. Inténtelo de nuevo por favor',
                    token: null
                }
            });
    }

    async register(user: any) {
        // Comprobar que no existe el usuario
        const userCheck = await this.database.findOne(this.collection,
            { $or: [{ username: user.username }, { email: user.email }] });
        if (userCheck !== null) {
            let message = '';
            if (userCheck.email === user.email && userCheck.username === user.username) {
                message = `El usuario cuyo email es ${user.email} y su usuario es ${user.username} ya existen. Prueba con otros por favor`;
            } else if (userCheck.username === user.username) {
                message = `El usuario cuyo usuario es ${user.username} ya existe. Prueba con otro usuario por favor`;
            } else if (userCheck.email === user.email) {
                message = `El usuario cuyo email es ${user.email} ya existe. Prueba con otro por favor`;
            }
            return this.registerFail(message);
        }
        user.id = await this.database.takeIdForCollection(this.collection);
        user.password = encriptPassword(user.password);
        user.registerDate = new Date().toISOString();

        // Insertar
        return await this.database.insertOneElement(this.collection, user)
            .then(async () => {
                return {
                    status: true,
                    message: `El usuario ${user.name} ${user.lastname} ha sido añadido correctamente`,
                    user
                }
            }).catch((err: any) => {
                // handle error
                console.log(err);
                return {
                    status: false,
                    message: `No ha sido posible añadir el usuario`,
                    user: null
                };
            });

    }

    async getMe(token: string) {
        const tokenData: any = new JWT().verify(token);
        if (tokenData === JWT_MESSAGES.VERIFICATION_FAILED) {
            return {
                status: false,
                message: 'Token expirado. Prueba a iniciar sesión de nuevo para obtener uno nuevo',
                user: null
            }
        }
        return {
            status: true,
            message: 'Información del usuario correcta',
            user: tokenData.user
        }
    }

    async getUsers() {
        return await this.database.findAll(COLLECTIONS.USERS)
            .then(async (users: any) => {
                return {
                    status: true,
                    message: 'Lista de usuarios',
                    users
                }
            })
            .catch((err: any) => {
                // handle error
                console.log(err);
                return {
                    status: false,
                    message: `No ha sido ...`,
                    users: null
                };
            });
    }
}

export default UserService;