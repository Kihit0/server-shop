import dotenv from 'dotenv';
import 'reflect-metadata';
import sequelize from './src/models/index';
import { createExpressServer } from 'routing-controllers';

dotenv.config();

sequelize.sync();

const PORT = process.env.PORT_ACTIONS || 3001;

class App {
  public init() {
    createExpressServer({
      cors: true,
      routePrefix: '/api',
      controllers: [],
    }).listen(PORT);
  }
}

const app = new App();
app.init();
