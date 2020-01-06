
class DBOperationsService {
    database: any;
    constructor(database: any) {
        this.database = database;
    }

    /**
     * Obtener el ID asignado dependiendo de su último ID en la colección
     */
    takeIdForCollection = async (collection: string) => {
        // Comprobamos el ID del usuario + reciente y le asignamos +1 
        const lastItem = await this.database.collection(collection)
            .find().limit(1)
            .sort({ registerDate: -1 }).toArray();
        return (lastItem.length === 0) ? '1' : String(+lastItem[0].id + 1);
    }
    /**
     * Insertar un elemento en la colección con la información proporcionada
     */
    insertOneElement = async (collection: string, data: any) => {
        return await this.database.collection(collection).insertOne(data);
    }

    /**
     * Buscar el documento con las condiciones que especifiquemos
     */
    findOne = async (collection: string, query: any) => {
        return await this.database.collection(collection).findOne(query);
    }
    /**
     * Buscar 1 ó más documentos que cumplen las condiciones
     */
    findAll = async (collection: string, query = {}) => {
        return await this.database.collection(collection)
            .find(query).toArray();
    }
}

export default DBOperationsService;

