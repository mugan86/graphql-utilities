"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const principal_1 = require("./../config/constants/principal");
const messages_1 = require("./../config/constants/messages");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWT {
    constructor() {
        this.secretKey = principal_1.SECRET_KEY;
    }
    sign(user, expireTime = 24 * 60 * 60) {
        delete user.password;
        return jsonwebtoken_1.default.sign({ user }, this.secretKey, { expiresIn: expireTime });
    }
    verify(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.secretKey);
        }
        catch (e) {
            return messages_1.JWT_MESSAGES.VERIFICATION_FAILED;
        }
    }
}
exports.default = JWT;
