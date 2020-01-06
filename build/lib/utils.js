"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNumber = (min = 6, max = 20) => {
    return Math.floor(Math.random() * max) + min;
};
exports.resultMessages = (result, type = 'token') => {
    return (type === 'token') ?
        ({
            status: (result.token) ? true : false,
            message: result.message,
            token: result.token
        }) :
        ({
            status: (result.status) ? true : false,
            message: result.message,
            user: result.user
        });
};
