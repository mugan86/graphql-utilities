"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environments_1 = __importDefault(require("./environments"));
const database_1 = __importDefault(require("./database"));
const principal_1 = require("./constants/principal");
const messages_1 = require("./constants/messages");
const config = {
    environment: environments_1.default,
    Database: database_1.default,
    constants: {
        secretKey: principal_1.SECRET_KEY,
        collections: principal_1.COLLECTIONS,
        jwtMsgs: messages_1.JWT_MESSAGES
    }
};
exports.default = config;
