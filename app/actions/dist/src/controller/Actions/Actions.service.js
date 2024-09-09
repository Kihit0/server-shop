"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Actions_1 = __importDefault(require("../../models/Actions"));
class ActionsService {
    constructor() {
        this.actions = Actions_1.default;
    }
    async findByQuery(query) {
        if (!Object.keys(query)) {
            return {
                message: 'Bad request',
                status: 400,
            };
        }
        const whereConditions = new Map();
        if (query.date_from && query.date_to) {
            whereConditions.set('date', {
                [sequelize_1.Op.between]: [query.date_from, query.date_to],
            });
        }
        else if (query.date_from || query.date_to) {
            return {
                message: 'Bad request',
                status: 400,
            };
        }
        const where = {
            ...query,
            ...Object.fromEntries(whereConditions),
        };
        return {
            data: (await this.actions.findAll({
                where,
            })).map((item) => item.dataValues),
        };
    }
    async create(body) {
        const requiredKeys = ['shop_id', 'action', 'on_shelf', 'in_order', 'plu'];
        if (!body || !requiredKeys.every((key) => key in body)) {
            return {
                message: 'Bad request',
                status: 400,
            };
        }
        return this.actions.create({ ...body, date: new Date() });
    }
}
exports.default = ActionsService;
