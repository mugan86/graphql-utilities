"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.encriptPassword = (password) => {
    return bcryptjs_1.default.hashSync(password, 10);
};
exports.passwordAccessCheck = (password1, password2) => {
    return bcryptjs_1.default.compareSync(password1, password2);
};
exports.hidePassWordContent = (hideChar = '*') => {
    return hideChar.repeat(utils_1.randomNumber());
};
