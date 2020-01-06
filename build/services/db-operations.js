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
Object.defineProperty(exports, "__esModule", { value: true });
class DBOperationsService {
    constructor(database) {
        this.takeIdForCollection = (collection) => __awaiter(this, void 0, void 0, function* () {
            const lastItem = yield this.database.collection(collection)
                .find().limit(1)
                .sort({ registerDate: -1 }).toArray();
            return (lastItem.length === 0) ? '1' : String(+lastItem[0].id + 1);
        });
        this.insertOneElement = (collection, data) => __awaiter(this, void 0, void 0, function* () {
            return yield this.database.collection(collection).insertOne(data);
        });
        this.findOne = (collection, query) => __awaiter(this, void 0, void 0, function* () {
            return yield this.database.collection(collection).findOne(query);
        });
        this.findAll = (collection, query = {}) => __awaiter(this, void 0, void 0, function* () {
            return yield this.database.collection(collection)
                .find(query).toArray();
        });
        this.database = database;
    }
}
exports.default = DBOperationsService;
