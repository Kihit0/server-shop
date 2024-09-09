import dotenv from 'dotenv';
import express from 'express';
import sequelize from './src/models/index.js';
import bodyParser from 'body-parser';
import Products from './src/models/Products.js';
import Stocks from './src/models/Stocks.js';
import productRouter from './src/routers/products.js';
import stocksRouter from './src/routers/stocks.js';

dotenv.config();

const PORT = process.env.PORT_PRODUCTS || 3000;

const app = express();
app.use(bodyParser.json());

sequelize.sync();

/* Associations */
Products.hasOne(Stocks);
Stocks.belongsTo(Products, {
  foreignKey: {
    name: 'product_id',
  },
});

app.use('/api', productRouter);
app.use('/api', stocksRouter);

app.listen(PORT, '0.0.0.0');
