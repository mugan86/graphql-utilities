export const randomNumber = (min: number = 6, max: number = 20) => {
    return Math.floor(Math.random() * max) + min;
}

export const resultMessages = (result: any, type: string = 'token', ) => {
    return (type === 'token') ?
                ({
                    status: (result.token) ? true: false,
                    message: result.message,
                    token: result.token
                }) : 
                ({
                    status: (result.status) ? true: false,
                    message: result.message,
                    user: result.user
                });
}