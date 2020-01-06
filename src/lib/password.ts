import { randomNumber } from './utils';
import bcryptjs from 'bcryptjs';
/**
 * Utility to add security our passwords
 * @param password password that must be use to encript
 */
export const encriptPassword = (password: string) => {
    return bcryptjs.hashSync (password, 10);
}

export const passwordAccessCheck = (password1: string, password2: string) => {
    return bcryptjs.compareSync (password1 , password2 )
}

export const hidePassWordContent = (hideChar: string = '*') => {
    return hideChar.repeat(randomNumber());
}