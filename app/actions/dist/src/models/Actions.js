"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Actions extends sequelize_1.Model {
}
Actions.init({
    shop_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    action: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    on_shelf: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    in_order: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    plu: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, { sequelize: _1.default });
exports.default = Actions;
