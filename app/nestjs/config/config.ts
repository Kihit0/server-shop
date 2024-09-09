import { SequelizeOptions } from 'sequelize-typescript';

export const config: SequelizeOptions = {
  dialect: 'postgres',
  database: process.env.DB_NAME || 'postgres',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  ssl: false,
  dialectOptions: {
    clientMinMessages: 'warning',
  },
};
