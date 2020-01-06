import environment from './environments';
import Database from './database';
import { SECRET_KEY, COLLECTIONS} from './constants/principal';
import { JWT_MESSAGES} from './constants/messages';
const config = {
    environment,
    Database,
    constants: {
        secretKey: SECRET_KEY,
        collections: COLLECTIONS,
        jwtMsgs: JWT_MESSAGES
    }
}
export default config;