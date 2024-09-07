"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const index_1 = __importDefault(require("./models/index"));
const routing_controllers_1 = require("routing-controllers");
dotenv_1.default.config();
index_1.default.sync();
const PORT = process.env.PORT_ACTIONS || 3001;
class App {
    init() {
        (0, routing_controllers_1.createExpressServer)({
            cors: true,
            routePrefix: '/api',
            controllers: [],
        }).listen(PORT);
    }
}
const app = new App();
app.init();
