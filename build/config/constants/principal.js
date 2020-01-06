"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environments_1 = __importDefault(require("../environments"));
if (process.env.NODE_ENV !== 'production') {
    const environment = environments_1.default;
}
exports.SECRET_KEY = process.env.SECRET || 'AnartzMugika';
exports.COLLECTIONS = {
    USERS: 'users'
};
