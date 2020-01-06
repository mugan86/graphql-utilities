"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("./../config/constants/messages");
const password_1 = require("./../lib/password");
const db_operations_1 = __importDefault(require("./db-operations"));
const principal_1 = require("./../config/constants/principal");
const jwt_1 = __importDefault(require("./../lib/jwt"));
const utils_1 = require("./../lib/utils");
class UserService {
    constructor(database) {
        this.collection = principal_1.COLLECTIONS.USERS;
        this.registerFail = (message) => {
            return { status: false, message, user: null };
        };
        this.database = new db_operations_1.default(database);
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.database.findOne(this.collection, { email }).
                then((result) => __awaiter(this, void 0, void 0, function* () {
                if (result !== null) {
                    if (!password_1.passwordAccessCheck(password, result.password)) {
                        return utils_1.resultMessages({
                            token: null,
                            message: 'Credenciales introducidas incorrectas'
                        }, 'token');
                    }
                    return {
                        status: true,
                        message: `El usuario ${result.name} ${result.lastname} ha iniciado sesión correctamente`,
                        token: new jwt_1.default().sign(result)
                    };
                }
                return {
                    status: false,
                    message: 'El usuario con el que quieres iniciar sesión no existe',
                    token: null
                };
            })).
                catch((_) => {
                return {
                    status: false,
                    message: 'Error inesperado, no se ha podido iniciar sesión. Inténtelo de nuevo por favor',
                    token: null
                };
            });
        });
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCheck = yield this.database.findOne(this.collection, { $or: [{ username: user.username }, { email: user.email }] });
            if (userCheck !== null) {
                let message = '';
                if (userCheck.email === user.email && userCheck.username === user.username) {
                    message = `El usuario cuyo email es ${user.email} y su usuario es ${user.username} ya existen. Prueba con otros por favor`;
                }
                else if (userCheck.username === user.username) {
                    message = `El usuario cuyo usuario es ${user.username} ya existe. Prueba con otro usuario por favor`;
                }
                else if (userCheck.email === user.email) {
                    message = `El usuario cuyo email es ${user.email} ya existe. Prueba con otro por favor`;
                }
                return this.registerFail(message);
            }
            user.id = yield this.database.takeIdForCollection(this.collection);
            user.password = password_1.encriptPassword(user.password);
            user.registerDate = new Date().toISOString();
            return yield this.database.insertOneElement(this.collection, user)
                .then(() => __awaiter(this, void 0, void 0, function* () {
                return {
                    status: true,
                    message: `El usuario ${user.name} ${user.lastname} ha sido añadido correctamente`,
                    user
                };
            })).catch((err) => {
                console.log(err);
                return {
                    status: false,
                    message: `No ha sido posible añadir el usuario`,
                    user: null
                };
            });
        });
    }
    getMe(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = new jwt_1.default().verify(token);
            if (tokenData === messages_1.JWT_MESSAGES.VERIFICATION_FAILED) {
                return {
                    status: false,
                    message: 'Token expirado. Prueba a iniciar sesión de nuevo para obtener uno nuevo',
                    user: null
                };
            }
            return {
                status: true,
                message: 'Información del usuario correcta',
                user: tokenData.user
            };
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.database.findAll(principal_1.COLLECTIONS.USERS)
                .then((users) => __awaiter(this, void 0, void 0, function* () {
                return {
                    status: true,
                    message: 'Lista de usuarios',
                    users
                };
            }))
                .catch((err) => {
                console.log(err);
                return {
                    status: false,
                    message: `No ha sido ...`,
                    users: null
                };
            });
        });
    }
}
exports.default = UserService;
