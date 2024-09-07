"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../config/index"));
const development = index_1.default.development;
//@ts-ignore
const sequelize = new sequelize_1.Sequelize(development);
exports.default = sequelize;
